import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { transferReferralBonus } from "@/lib/wallet"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wallet = await transferReferralBonus(session.user.id)

    return NextResponse.json({ success: true, wallet })
  } catch (error: any) {
    console.error("Transfer referral bonus error:", error)
    return NextResponse.json({ error: error.message || "Failed to transfer referral bonus" }, { status: 500 })
  }
}

