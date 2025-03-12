"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createInvestment } from "@/lib/investment"

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

