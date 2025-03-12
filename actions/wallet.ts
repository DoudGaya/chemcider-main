"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { addFundsToWallet, withdrawFundsFromWallet, transferReferralBonus } from "@/lib/wallet"

export async function addFundsAction(amount: number, reference?: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    if (amount <= 0) {
      return { error: "Invalid amount" }
    }

    await addFundsToWallet(session.user.id, amount, reference)

    revalidatePath("/dashboard/wallet")

    return { success: "Funds added successfully" }
  } catch (error) {
    console.error("Add funds error:", error)
    return { error: "Failed to add funds" }
  }
}

export async function withdrawFundsAction(amount: number) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    if (amount <= 0) {
      return { error: "Invalid amount" }
    }

    await withdrawFundsFromWallet(session.user.id, amount)

    revalidatePath("/dashboard/wallet")

    return { success: "Withdrawal successful" }
  } catch (error: any) {
    console.error("Withdraw funds error:", error)
    return { error: error.message || "Failed to process withdrawal" }
  }
}

export async function transferReferralBonusAction() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    await transferReferralBonus(session.user.id)

    revalidatePath("/dashboard/wallet")
    revalidatePath("/dashboard/referrals")

    return { success: "Referral bonus transferred successfully" }
  } catch (error: any) {
    console.error("Transfer referral bonus error:", error)
    return { error: error.message || "Failed to transfer referral bonus" }
  }
}

