import { prisma } from "@/lib/prisma"

export const getWalletByUserId = async (userId: string) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    })

    return wallet
  } catch {
    return null
  }
}

export const addFundsToWallet = async (userId: string, amount: number, reference?: string) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    })

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          increment: amount,
        },
      },
    })

    // Record the transaction
    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount,
        type: "DEPOSIT",
        status: "COMPLETED",
        reference,
        description: `Deposit of $${amount}`,
      },
    })

    return updatedWallet
  } catch (error) {
    console.error("Error adding funds to wallet:", error)
    throw new Error("Failed to add funds to wallet")
  }
}

export const withdrawFundsFromWallet = async (userId: string, amount: number) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    })

    if (!wallet) {
      throw new Error("Wallet not found")
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient funds")
    }

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          decrement: amount,
        },
      },
    })

    // Record the transaction
    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: -amount,
        type: "WITHDRAWAL",
        status: "COMPLETED",
        description: `Withdrawal of $${amount}`,
      },
    })

    return updatedWallet
  } catch (error) {
    console.error("Error withdrawing funds from wallet:", error)
    throw error
  }
}

export const getTransactionsByWalletId = async (walletId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { walletId },
      orderBy: {
        createdAt: "desc",
      },
    })

    return transactions
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return []
  }
}

export const transferReferralBonus = async (userId: string) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    })

    if (!wallet || wallet.referralBalance <= 0) {
      throw new Error("No referral balance to transfer")
    }

    const bonusAmount = wallet.referralBalance

    // Transfer referral bonus to main balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          increment: bonusAmount,
        },
        referralBalance: 0,
      },
    })

    // Record the transaction
    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: bonusAmount,
        type: "REFERRAL_BONUS",
        status: "COMPLETED",
        description: `Referral bonus of $${bonusAmount} transferred to main balance`,
      },
    })

    return updatedWallet
  } catch (error) {
    console.error("Error transferring referral bonus:", error)
    throw error
  }
}

