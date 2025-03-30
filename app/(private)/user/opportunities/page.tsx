import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { OpportunitiesList } from "./opportunities-list"

export const metadata = {
  title: "Investment Opportunities | Commodex",
  description: "Explore and invest in high-yield commodity opportunities",
}

async function getOpportunities() {
  // Get all active products first, then others
  const activeProducts = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const otherProducts = await prisma.product.findMany({
    where: {
      status: {
        not: "ACTIVE",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Combine with active products first
  return [...activeProducts, ...otherProducts]
}

export default async function OpportunitiesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const opportunities = await getOpportunities()

  // Get user wallet balance for investment validation
  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Investment Opportunities</h1>
        <p className="text-muted-foreground">
          Explore our curated selection of high-yield commodity investment opportunities.
        </p>
      </div>

      <OpportunitiesList opportunities={opportunities} walletBalance={wallet?.balance || 0} userId={session.user.id} />
    </div>
  )
}

