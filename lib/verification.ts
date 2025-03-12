import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export const generateVerificationToken = async (email: string, type: "EMAIL" | "PASSWORD_RESET") => {
  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 24 hours

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const existingToken = await prisma.verification.findFirst({
    where: {
      userId: user.id,
      type,
    },
  })

  if (existingToken) {
    await prisma.verification.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await prisma.verification.create({
    data: {
      userId: user.id,
      token,
      expires,
      type,
    },
  })

  return verificationToken
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verification.findFirst({
      where: {
        token,
        expires: { gt: new Date() },
      },
    })

    return verificationToken
  } catch {
    return null
  }
}

