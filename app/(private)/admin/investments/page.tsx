import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
// import { InvestmentColumns } from "./columns"
import { InvestmentColumns } from "./columns"

export const metadata = {
  title: "Investments | Admin Dashboard",
  description: "Manage investments on the Commodex platform",
}

async function getInvestments() {
  const investments = await prisma.investment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          title: true,
          returnPerCycle: true,
          cycle: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return investments
}

export default async function InvestmentsPage() {
  const investments = await getInvestments()

  const formattedInvestments = investments.map((investment) => ({
    ...investment,
    createdAt: investment.createdAt.toISOString(),
    updatedAt: investment.updatedAt.toISOString(),
    formattedAmount: formatCurrency(investment.amount),
    userName: investment.user.name || "Unknown",
    userEmail: investment.user.email,
    productTitle: investment.product.title,
    expectedReturn: formatCurrency(
      investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle),
    ),
  }))

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={InvestmentColumns}
          data={formattedInvestments}
          searchColumn="productTitle"
          searchPlaceholder="Search by product..."
        />
      </div>
    </div>
  )
}

