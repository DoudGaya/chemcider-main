import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export const generateTwoFactorToken = async (userId: string) => {
  // Generate a random 6-digit code
  const token = crypto.randomInt(100000, 999999).toString()

  // Set expiry to 10 minutes
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000)

  const existingToken = await prisma.verification.findFirst({
    where: {
      userId,
      type: "TWO_FACTOR",
    },
  })

  if (existingToken) {
    await prisma.verification.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const twoFactorToken = await prisma.verification.create({
    data: {
      userId,
      token,
      expires,
      type: "TWO_FACTOR",
    },
  })

  return twoFactorToken
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.verification.findFirst({
      where: {
        token,
        type: "TWO_FACTOR",
        expires: { gt: new Date() },
      },
    })

    return twoFactorToken
  } catch {
    return null
  }
}

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    })

    return twoFactorConfirmation
  } catch {
    return null
  }
}

