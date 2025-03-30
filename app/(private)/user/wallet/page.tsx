import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { WalletFundingForm } from "./wallet-funding-form"
import { TransactionsList } from "./transactions-list"

export const metadata = {
  title: "My Wallet | Commodex",
  description: "Manage your wallet and transactions",
}

async function getWalletData(userId: string) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!wallet) {
    // Create wallet if it doesn't exist
    return prisma.wallet.create({
      data: {
        userId,
        balance: 0,
        referralBalance: 0,
      },
      include: {
        transactions: true,
      },
    })
  }

  return wallet
}

export default async function WalletPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const wallet = await getWalletData(session.user.id)

  // Calculate total deposits
  const totalDeposits = wallet.transactions
    .filter((tx) => tx.type === "DEPOSIT" && tx.status === "COMPLETED")
    .reduce((total, tx) => total + tx.amount, 0)

  // Calculate total withdrawals
  const totalWithdrawals = wallet.transactions
    .filter((tx) => tx.type === "WITHDRAWAL" && tx.status === "COMPLETED")
    .reduce((total, tx) => total + Math.abs(tx.amount), 0)

  // Calculate total investments
  const totalInvestments = wallet.transactions
    .filter((tx) => tx.type === "INVESTMENT" && tx.status === "COMPLETED")
    .reduce((total, tx) => total + Math.abs(tx.amount), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current available balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(wallet.balance)}</div>
              {wallet.referralBalance > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Plus {formatCurrency(wallet.referralBalance)} in referral bonuses
                </p>
              )}
            </CardContent>
          </Card>

          <WalletFundingForm userId={session.user.id} userEmail={session.user.email} />
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalDeposits)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalWithdrawals)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalInvestments)}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionsList transactions={wallet.transactions.slice(0, 5)} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete history of your wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionsList transactions={wallet.transactions} showPagination />
        </CardContent>
      </Card>
    </div>
  )
}

