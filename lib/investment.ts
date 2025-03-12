import { prisma } from "@/lib/prisma"

export const getInvestmentsByUserId = async (userId: string) => {
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
    // Start a transaction
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

