import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Download, LineChart, LogOut, PieChart, TrendingUp, Users } from "lucide-react"
import { UserReferralSection } from "@/components/user-referral-section"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getInvestmentsByUserId } from "@/lib/investment"
import { getWalletByUserId } from "@/lib/wallet"
import { getUserById } from "@/lib/user"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Pie } from "recharts"



import type { ChartDataPoint, InvestmentWithProduct, Wallet } from "@/types"
import DashboardHeader from "./_components/DashboardHeader"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.id) {
    redirect("/login")
  }

  const user = await getUserById(session.user.id)
  const investments = (await getInvestmentsByUserId(session.user.id)) as InvestmentWithProduct[]
  const wallet = (await getWalletByUserId(session.user.id)) as Wallet | null

  // Calculate total investment
  const totalInvestment = investments.reduce((total, investment) => total + investment.amount, 0)

  // Calculate active projects
  const activeProjects = investments.filter((investment) => investment.status === "ACTIVE").length

  // Calculate average ROI
  const averageROI =
    investments.length > 0
      ? investments.reduce((total, investment) => total + investment.product.returnPerCycle, 0) / investments.length
      : 0

  // Calculate projected returns
  const projectedReturns = investments.reduce((total, investment) => {
    const returnPerCycle = investment.product.returnPerCycle / 100
    return total + investment.amount * (1 + returnPerCycle) * investment.product.cycle
  }, 0)

  // Prepare chart data
  const monthlyReturnsData = [
    { name: "Jan", value: 2500 },
    { name: "Feb", value: 3200 },
    { name: "Mar", value: 2800 },
    { name: "Apr", value: 4200 },
    { name: "May", value: 3800 },
    { name: "Jun", value: 4800 },
    { name: "Jul", value: 5200 },
    { name: "Aug", value: 4900 },
    { name: "Sep", value: 5800 },
    { name: "Oct", value: 6200 },
    { name: "Nov", value: 6800 },
    { name: "Dec", value: 7500 },
  ]

  // Prepare allocation data
  const allocationData: ChartDataPoint[] = investments.map((investment) => ({
    name: investment.product.title,
    value: investment.amount,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-6 py-6">
          <div className="grid gap-6 md:grid-cols-2 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
                <p className="text-xs text-muted-foreground">
                  {wallet ? `Balance: ${formatCurrency(wallet.balance)}` : "No wallet found"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {investments.length > 0 ? `${investments.length} total investments` : "No investments yet"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageROI.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Per investment cycle</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Returns</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(projectedReturns)}</div>
                <p className="text-xs text-muted-foreground">At maturity</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="container px-6 mx-auto">
          <div>
            <UserReferralSection
            // @ts-ignore
              referralCode={user.referralCode}
              // @ts-ignore
              referralCount={user.referrals?.length || 0}
              referralBalance={wallet?.referralBalance || 0}
              hasReferralBonus={(wallet?.referralBalance || 0) > 0}
            />
          </div>
        </div>
      </main>
      
      {/* <footer className="w-full border-t bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Chemcider. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Help & Support
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  )
}