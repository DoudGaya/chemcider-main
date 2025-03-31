"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { generateInvestmentBarcode } from "@/lib/barcode"
import { initializePayment } from "@/lib/paystack"

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

interface DirectPaymentParams {
  productId: string
  units: number
  userId: string
  amount: number
  email: string
}

export async function initiateDirectPayment({ productId, units, userId, amount, email }: DirectPaymentParams) {
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

    // Get user email if not provided
    if (!email) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })

      if (!user) {
        return { error: "User not found" }
      }

      email = user.email
    }

    // Generate a unique reference
    const reference = `INV_${userId}_${productId}_${Date.now()}`

    // Initialize payment with Paystack
    const result = await initializePayment({
      email,
      amount,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/wallet/verify-payment?investment=true&productId=${productId}&units=${units}`,
      metadata: {
        userId,
        productId,
        units,
        type: "DIRECT_INVESTMENT",
      },
    })

    if (!result.status) {
      return { error: result.message || "Failed to initialize payment" }
    }

    return {
      success: true,
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    }
  } catch (error: any) {
    console.error("Direct payment error:", error)
    return { error: error.message || "Failed to initiate payment" }
  }
}



// "use server"

// import { revalidatePath } from "next/cache"
// import { prisma } from "@/lib/prisma"
// import { generateInvestmentBarcode } from "@/lib/barcode"

// interface InvestmentParams {
//   productId: string
//   units: number
//   userId: string
// }

// export async function initiateInvestment({ productId, units, userId }: InvestmentParams) {
//   try {
//     // Get product details
//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//     })

//     if (!product) {
//       return { error: "Product not found" }
//     }

//     if (product.status !== "ACTIVE") {
//       return { error: "This investment opportunity is not currently active" }
//     }

//     // Calculate investment amount
//     const amount = product.unitAmount * units

//     // Check if user has enough balance
//     const wallet = await prisma.wallet.findUnique({
//       where: { userId },
//     })

//     if (!wallet || wallet.balance < amount) {
//       return { error: "Insufficient funds" }
//     }

//     // Generate a unique barcode for this investment
//     const barcode = await generateInvestmentBarcode(userId, productId, units)

//     // Start a transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Deduct from wallet
//       await tx.wallet.update({
//         where: { id: wallet.id },
//         data: {
//           balance: {
//             decrement: amount,
//           },
//         },
//       })

//       // Record transaction
//       await tx.transaction.create({
//         data: {
//           walletId: wallet.id,
//           amount: -amount,
//           type: "INVESTMENT",
//           status: "COMPLETED",
//           description: `Investment in ${product.title} (${units} units)`,
//         },
//       })

//       // Update product current amount
//       const updatedProduct = await tx.product.update({
//         where: { id: productId },
//         data: {
//           currentAmount: {
//             increment: amount,
//           },
//         },
//       })

//       // Check if product is now fully funded
//       if (updatedProduct.currentAmount >= updatedProduct.targetAmount) {
//         await tx.product.update({
//           where: { id: productId },
//           data: {
//             status: "FUNDED",
//           },
//         })
//       }

//       // Create investment record
//       const investment = await tx.investment.create({
//         data: {
//           userId,
//           productId,
//           amount,
//           units,
//           status: "ACTIVE",
//           barcode,
//         },
//       })

//       return investment
//     })

//     revalidatePath("/dashboard/opportunities")
//     revalidatePath("/dashboard/investments")
//     revalidatePath(`/dashboard/investments/${result.id}`)

//     return { success: true, investmentId: result.id }
//   } catch (error: any) {
//     console.error("Investment error:", error)
//     return { error: error.message || "Failed to process investment" }
//   }
// }

