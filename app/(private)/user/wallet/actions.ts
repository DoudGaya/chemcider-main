"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { initializePayment, verifyPayment } from "@/lib/paystack"
import { addFundsToWallet } from "@/lib/wallet"

interface FundingParams {
  userId: string
  email: string
  amount: number
}

export async function initiateFunding({ userId, email, amount }: FundingParams) {
  try {
    // Generate a unique reference
    const reference = `FUND_${userId}_${Date.now()}`

    // Initialize payment with Paystack
    const result = await initializePayment({
      email,
      amount,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/wallet/verify-payment`,
      metadata: {
        userId,
        type: "WALLET_FUNDING",
      },
    })

    if (!result.status) {
      return { error: result.message || "Failed to initialize payment" }
    }

    // Store the pending transaction
    await prisma.transaction.create({
      data: {
        walletId: (await prisma.wallet.findUnique({ where: { userId } }))!.id,
        amount,
        type: "DEPOSIT",
        status: "PENDING",
        reference,
        description: `Wallet funding of ₦${amount}`,
      },
    })

    return {
      success: true,
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    }
  } catch (error: any) {
    console.error("Funding error:", error)
    return { error: error.message || "Failed to initiate funding" }
  }
}

interface VerifyPaymentParams {
  reference: string
}

export async function verifyFundingPayment({ reference }: VerifyPaymentParams) {
  try {
    // Verify payment with Paystack
    const result = await verifyPayment(reference)

    if (!result.status || result.data.status !== "success") {
      return { error: "Payment verification failed" }
    }

    // Get the transaction
    const transaction = await prisma.transaction.findFirst({
      where: { reference },
      include: { wallet: true },
    })

    if (!transaction) {
      return { error: "Transaction not found" }
    }

    if (transaction.status === "COMPLETED") {
      return { success: true, message: "Payment already processed" }
    }

    // Update the transaction status
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: "COMPLETED" },
    })

    // Add funds to wallet
    await addFundsToWallet(transaction.wallet.userId, transaction.amount, reference)

    revalidatePath("/dashboard/wallet")

    return { success: true }
  } catch (error: any) {
    console.error("Verify payment error:", error)
    return { error: error.message || "Failed to verify payment" }
  }
}

