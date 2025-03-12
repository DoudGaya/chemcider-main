import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import crypto from "crypto"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  } catch {
    return null
  }
}

export const createUser = async (name: string, email: string, password: string, referredBy?: string) => {
  const hashedPassword = await hash(password, 10)
  const referralCode = crypto.randomBytes(6).toString("hex")

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      referralCode,
      referredBy,
    },
  })

  // Create wallet for the user
  await prisma.wallet.create({
    data: {
      userId: user.id,
    },
  })

  // If user was referred, add referral bonus to referrer
  if (referredBy) {
    const referrer = await getUserById(referredBy)
    if (referrer) {
      const referrerWallet = await prisma.wallet.findUnique({
        where: { userId: referrer.id },
      })

      if (referrerWallet) {
        // Add referral bonus to referrer's wallet
        const REFERRAL_BONUS = 10 // $10 bonus
        await prisma.wallet.update({
          where: { id: referrerWallet.id },
          data: {
            referralBalance: {
              increment: REFERRAL_BONUS,
            },
          },
        })

        // Record the transaction
        await prisma.transaction.create({
          data: {
            walletId: referrerWallet.id,
            amount: REFERRAL_BONUS,
            type: "REFERRAL_BONUS",
            status: "COMPLETED",
            description: `Referral bonus for inviting ${email}`,
          },
        })
      }
    }
  }

  return user
}

