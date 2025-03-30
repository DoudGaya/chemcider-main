import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { InvestmentsList } from "./investments-list"

export const metadata = {
  title: "My Investments | Commodex",
  description: "View and manage your investments",
}

async function getUserInvestments(userId: string) {
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
}

export default async function InvestmentsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const investments = await getUserInvestments(session.user.id)

  // Calculate total invested amount
  const totalInvested = investments.reduce((total, investment) => total + investment.amount, 0)

  // Calculate total expected return
  const totalExpectedReturn = investments.reduce((total, investment) => {
    const returnAmount = investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle)
    return total + returnAmount
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Investments</h1>
        <p className="text-muted-foreground">View and manage your investment portfolio.</p>
      </div>

      <InvestmentsList
        investments={investments}
        totalInvested={totalInvested}
        totalExpectedReturn={totalExpectedReturn}
      />
    </div>
  )
}

