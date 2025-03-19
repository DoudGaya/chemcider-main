import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import { UserColumns } from "./columns"

export const metadata = {
  title: "Users | Admin Dashboard",
  description: "Manage users on the Commodex platform",
}

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      wallet: true,
      referrals: {
        select: {
          id: true,
        },
      },
      investments: {
        select: {
          id: true,
          amount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return users
}

export default async function UsersPage() {
  const users = await getUsers()

  const formattedUsers = users.map((user) => {
    const totalInvestment = user.investments.reduce((total, investment) => total + investment.amount, 0)

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
      referralCount: user.referrals.length,
      investmentCount: user.investments.length,
      totalInvestment,
      walletBalance: user.wallet?.balance || 0,
      referralBalance: user.wallet?.referralBalance || 0,
    }
  })

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={UserColumns}
          data={formattedUsers}
          searchColumn="email"
          searchPlaceholder="Search by email..."
        />
      </div>
    </div>
  )
}


