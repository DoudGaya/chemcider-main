import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, DollarSign, TrendingUp, Users } from "lucide-react"
import { Chart } from "@/components/ui/chart"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

export const metadata = {
  title: "Admin Dashboard | ACMEGRID",
  description: "Admin dashboard for ACMEGRID",
}

async function getAnalytics() {
  const userCount = await prisma.user.count()
  const productCount = await prisma.product.count()
  const investmentCount = await prisma.investment.count()

  const totalInvestmentAmount = await prisma.investment.aggregate({
    _sum: {
      amount: true,
    },
  })

  const activeInvestments = await prisma.investment.count({
    where: {
      status: "ACTIVE",
    },
  })

  const completedInvestments = await prisma.investment.count({
    where: {
      status: "COMPLETED",
    },
  })

  const totalWalletBalance = await prisma.wallet.aggregate({
    _sum: {
      balance: true,
    },
  })

  const totalReferralBalance = await prisma.wallet.aggregate({
    _sum: {
      referralBalance: true,
    },
  })

  // Get monthly investment data for the current year
  const currentYear = new Date().getFullYear()
  const monthlyInvestments = await prisma.investment.groupBy({
    by: ["createdAt"],
    _sum: {
      amount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    where: {
      createdAt: {
        gte: new Date(`${currentYear}-01-01`),
        lt: new Date(`${currentYear + 1}-01-01`),
      },
    },
  })

  // Process monthly data
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const monthlyData = Array(12)
    .fill(0)
    .map((_, i) => ({
      name: monthNames[i],
      value: 0,
    }))

  monthlyInvestments.forEach((item) => {
    const month = new Date(item.createdAt).getMonth()
    monthlyData[month].value = item._sum.amount || 0
  })

  // Get product distribution data
  const productInvestments = await prisma.investment.groupBy({
    by: ["productId"],
    _sum: {
      amount: true,
    },
  })

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productInvestments.map((p) => p.productId),
      },
    },
  })

  const productDistribution = productInvestments.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      name: product?.title || "Unknown",
      value: item._sum.amount || 0,
    }
  })

  return {
    userCount,
    productCount,
    investmentCount,
    totalInvestmentAmount: totalInvestmentAmount._sum.amount || 0,
    activeInvestments,
    completedInvestments,
    totalWalletBalance: totalWalletBalance._sum.balance || 0,
    totalReferralBalance: totalReferralBalance._sum.referralBalance || 0,
    monthlyData,
    productDistribution,
  }
}

export default async function AdminDashboard() {
  const analytics = await getAnalytics()

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Commodex admin dashboard. Here you can manage products, investments, users, and more.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.userCount}</div>
              <p className="text-xs text-muted-foreground">Registered users on the platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.investmentCount}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.activeInvestments} active, {analytics.completedInvestments} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investment Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analytics.totalInvestmentAmount)}</div>
              <p className="text-xs text-muted-foreground">Total investment amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analytics.totalWalletBalance)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(analytics.totalReferralBalance)} in referral bonuses
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Investments</CardTitle>
                  <CardDescription>Investment volume by month for {new Date().getFullYear()}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <Chart.Bar
                    data={analytics.monthlyData}
                    index="name"
                    categories={["value"]}
                    colors={["#0ea5e9"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                    showLegend={false}
                    showXAxis
                    showYAxis
                    showGridLines
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Investment Distribution</CardTitle>
                  <CardDescription>Investment by product</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {analytics.productDistribution.length > 0 ? (
                    <Chart.Pie
                      data={analytics.productDistribution}
                      index="name"
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      category="value"
                      colors={["#0ea5e9", "#14b8a6", "#6366f1", "#8b5cf6", "#ec4899"]}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">No investment data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent> */}

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Detailed metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">User Growth</h3>
                    <p className="text-sm text-muted-foreground">
                      User acquisition and retention metrics will be displayed here.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Investment Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed investment performance metrics will be displayed here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

