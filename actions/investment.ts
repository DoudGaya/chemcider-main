"use server"
import { prisma } from "@/lib/prisma"
import { InvestmentWithProduct } from "@/types"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
// import { createInvestment } from "@/lib/investment"
// import { createInvestment } from "@/lib/investment"

export async function investAction(productId: string, units: number) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    if (units <= 0) {
      return { error: "Invalid number of units" }
    }

    await createInvestment(session.user.id, productId, units)

    revalidatePath("/dashboard/investments")
    revalidatePath(`/products/${productId}`)

    return { success: "Investment successful" }
  } catch (error: any) {
    console.error("Investment error:", error)
    return { error: error.message || "Failed to process investment" }
  }
}




export const getInvestmentsByUserId = async (userId: string): Promise<InvestmentWithProduct[]> => {
  try {
    const investments = await prisma.investment.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return investments
  } catch (error) {
    console.error("Error fetching investments:", error)
    return []
  }
}

export const getInvestmentById = async (id: string) => {
  try {
    const investment = await prisma.investment.findUnique({
      where: { id },
      include: {
        product: true,
      },
    })

    return investment
  } catch {
    return null
  }
}

export const createInvestment = async (userId: string, productId: string, units: number) => {
  try {

    return await prisma.$transaction(async (tx) => {
      // Get product details
      const product = await tx.product.findUnique({
        where: { id: productId },
      })

      if (!product) {
        throw new Error("Product not found")
      }

      if (product.status !== "ACTIVE") {
        throw new Error("Product is not available for investment")
      }

      // Calculate investment amount
      const amount = product.unitAmount * units

      // Check if user has enough balance
      const wallet = await tx.wallet.findUnique({
        where: { userId },
      })

      if (!wallet || wallet.balance < amount) {
        throw new Error("Insufficient funds")
      }

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
        },
      })

      return investment
    })
  } catch (error) {
    console.error("Error creating investment:", error)
    throw error
  }
}



// "use server"
// import { revalidatePath } from "next/cache"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { createInvestment } from "@/lib/investment"

// export async function investAction(productId: string, units: number) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session || !session.user.id) {
//       return { error: "Unauthorized" }
//     }

//     if (units <= 0) {
//       return { error: "Invalid number of units" }
//     }

//     await createInvestment(session.user.id, productId, units)

//     revalidatePath("/dashboard/investments")
//     revalidatePath(`/products/${productId}`)

//     return { success: "Investment successful" }
//   } catch (error: any) {
//     console.error("Investment error:", error)
//     return { error: error.message || "Failed to process investment" }
//   }
// }

