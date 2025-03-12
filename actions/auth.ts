"use server"

import { hash } from "bcryptjs"
import { getUserByEmail, createUser } from "@/lib/user"
import { generateVerificationToken, getVerificationTokenByToken } from "@/lib/verification"
import { sendVerificationEmail, sendPasswordResetEmail, sendTwoFactorEmail } from "@/lib/mail"
import { generateTwoFactorToken, getTwoFactorTokenByToken } from "@/lib/two-factor"
import { prisma } from "@/lib/prisma"

export async function register(data: { name: string; email: string; password: string }, referralCode?: string | null) {
  try {
    const { name, email, password } = data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: "Email already in use" }
    }

    // Find referrer if referral code was provided
    let referrerId: string | undefined

    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      })

      if (referrer) {
        referrerId = referrer.id
      }
    }

    // Create the user
    const user = await createUser(name, email, password, referrerId)

    // Generate verification token
    const verificationToken = await generateVerificationToken(email, "EMAIL")

    // Send verification email
    await sendVerificationEmail(email, verificationToken.token)

    return { success: "Verification email sent" }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Something went wrong" }
  }
}

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await getVerificationTokenByToken(token)

    if (!verificationToken) {
      return { error: "Invalid or expired token" }
    }

    // Get user from token
    const user = await prisma.user.findUnique({
      where: { id: verificationToken.userId },
    })

    if (!user) {
      return { error: "User not found" }
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    })

    // Delete the used token
    await prisma.verification.delete({
      where: { id: verificationToken.id },
    })

    return { success: "Email verified" }
  } catch (error) {
    console.error("Email verification error:", error)
    return { error: "Something went wrong" }
  }
}

export async function forgotPassword(email: string) {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      // Don't reveal that the email doesn't exist
      return { success: "Reset email sent" }
    }

    // Generate password reset token
    const resetToken = await generateVerificationToken(email, "PASSWORD_RESET")

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken.token)

    return { success: "Reset email sent" }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "Something went wrong" }
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const resetToken = await getVerificationTokenByToken(token)

    if (!resetToken) {
      return { error: "Invalid or expired token" }
    }

    // Get user from token
    const user = await prisma.user.findUnique({
      where: { id: resetToken.userId },
    })

    if (!user) {
      return { error: "User not found" }
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10)

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete the used token
    await prisma.verification.delete({
      where: { id: resetToken.id },
    })

    return { success: "Password reset successful" }
  } catch (error) {
    console.error("Reset password error:", error)
    return { error: "Something went wrong" }
  }
}

export async function generateTwoFactorAuthenticationCode(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user || !user.email) {
      return { error: "User not found" }
    }

    // Generate 2FA token
    const twoFactorToken = await generateTwoFactorToken(userId)

    // Send 2FA email
    await sendTwoFactorEmail(user.email, twoFactorToken.token)

    return { success: "Two-factor code sent" }
  } catch (error) {
    console.error("Generate 2FA code error:", error)
    return { error: "Something went wrong" }
  }
}

export async function verifyTwoFactorCode(userId: string, code: string) {
  try {
    // Find the token
    const twoFactorToken = await getTwoFactorTokenByToken(code)

    if (!twoFactorToken || twoFactorToken.userId !== userId) {
      return { error: "Invalid code" }
    }

    // Delete the used token
    await prisma.verification.delete({
      where: { id: twoFactorToken.id },
    })

    // Create a 2FA confirmation
    await prisma.twoFactorConfirmation.upsert({
      where: { userId },
      update: { createdAt: new Date() },
      create: { userId },
    })

    return { success: "Two-factor authentication successful" }
  } catch (error) {
    console.error("Verify 2FA code error:", error)
    return { error: "Something went wrong" }
  }
}

export async function enableTwoFactor(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: true },
    })

    return { success: "Two-factor authentication enabled" }
  } catch (error) {
    console.error("Enable 2FA error:", error)
    return { error: "Something went wrong" }
  }
}

export async function disableTwoFactor(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorEnabled: false },
    })

    return { success: "Two-factor authentication disabled" }
  } catch (error) {
    console.error("Disable 2FA error:", error)
    return { error: "Something went wrong" }
  }
}

