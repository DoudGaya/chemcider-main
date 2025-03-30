"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { generateInvestmentBarcode } from "@/lib/barcode"

interface InvestmentParams {
  productId: string
  units: number
  userId: string
}

export async function initiateInvestment({ productId, units, userId }: InvestmentParams) {
  try {
    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { error: "Product not found" }
    }

    if (product.status !== "ACTIVE") {
      return { error: "This investment opportunity is not currently active" }
    }

    // Calculate investment amount
    const amount = product.unitAmount * units

    // Check if user has enough balance
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    })

    if (!wallet || wallet.balance < amount) {
      return { error: "Insufficient funds" }
    }

    // Generate a unique barcode for this investment
    const barcode = await generateInvestmentBarcode(userId, productId, units)

    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct from wallet
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })

      // Record transaction
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount: -amount,
          type: "INVESTMENT",
          status: "COMPLETED",
          description: `Investment in ${product.title} (${units} units)`,
        },
      })

      // Update product current amount
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: {
          currentAmount: {
            increment: amount,
          },
        },
      })

      // Check if product is now fully funded
      if (updatedProduct.currentAmount >= updatedProduct.targetAmount) {
        await tx.product.update({
          where: { id: productId },
          data: {
            status: "FUNDED",
          },
        })
      }

      // Create investment record
      const investment = await tx.investment.create({
        data: {
          userId,
          productId,
          amount,
          units,
          status: "ACTIVE",
          barcode,
        },
      })

      return investment
    })

    revalidatePath("/dashboard/opportunities")
    revalidatePath("/dashboard/investments")
    revalidatePath(`/dashboard/investments/${result.id}`)

    return { success: true, investmentId: result.id }
  } catch (error: any) {
    console.error("Investment error:", error)
    return { error: error.message || "Failed to process investment" }
  }
}

