import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
// import { WalletColumns } from "./columns"
import { WalletColumns } from "../columns"

export const metadata = {
  title: "Wallets | Admin Dashboard",
  description: "Manage wallets on the Commodex platform",
}

async function getWallets() {
  const wallets = await prisma.wallet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      transactions: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      balance: "desc",
    },
  })

  return wallets
}

export default async function WalletsPage() {
  const wallets = await getWallets()

  const formattedWallets = wallets.map((wallet) => ({
    ...wallet,
    createdAt: wallet.createdAt.toISOString(),
    updatedAt: wallet.updatedAt.toISOString(),
    formattedBalance: formatCurrency(wallet.balance),
    formattedReferralBalance: formatCurrency(wallet.referralBalance),
    userName: wallet.user.name || "Unknown",
    userEmail: wallet.user.email,
    transactionCount: wallet.transactions.length,
  }))

  const totalBalance = wallets.reduce((total, wallet) => total + wallet.balance, 0)
  const totalReferralBalance = wallets.reduce((total, wallet) => total + wallet.referralBalance, 0)

  return (
    <div className="container">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Wallets</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Referral Balance</div>
            <div className="text-2xl font-bold">{formatCurrency(totalReferralBalance)}</div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={WalletColumns}
          data={formattedWallets}
          searchColumn="userEmail"
          searchPlaceholder="Search by email..."
        />
      </div>
    </div>
  )
}

