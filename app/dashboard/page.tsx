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
      <DashboardHeader user={user} />
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <div className="relative flex items-center gap-2">
                <Image
                  src={user?.image || "/placeholder.svg?height=32&width=32"}
                  width={32}
                  height={32}
                  alt="User avatar"
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
            <p className="text-muted-foreground">Track your investments and monitor product development progress.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        
          {/* <div className="mt-8">
            <Tabs defaultValue="active">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="active">Active Projects</TabsTrigger>
                  <TabsTrigger value="completed">Completed Projects</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming Opportunities</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="active" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {investments
                    .filter((investment) => investment.status === "ACTIVE")
                    .map((investment) => (
                      <Card key={investment.id}>
                        <CardHeader className="pb-2">
                          <CardTitle>{investment.product.title}</CardTitle>
                          <CardDescription>
                            Started: {new Date(investment.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Development Progress</span>
                                <span className="font-medium">
                                  {Math.round(
                                    (investment.product.currentAmount / investment.product.targetAmount) * 100,
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
                                  style={{
                                    width: `${Math.round((investment.product.currentAmount / investment.product.targetAmount) * 100)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="pt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Your Investment</span>
                                <span>{formatCurrency(investment.amount)}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Units</span>
                                <span>{investment.units}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Expected ROI</span>
                                <span>{investment.product.returnPerCycle}%</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Cycle</span>
                                <span>{investment.product.cycle} months</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Detailed Report
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                  {investments.filter((investment) => investment.status === "ACTIVE").length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">You don't have any active investments.</p>
                      <Button asChild className="mt-4 bg-gradient-to-r from-teal-500 to-blue-600">
                        <Link href="/products">Browse Investment Opportunities</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {investments
                    .filter((investment) => investment.status === "COMPLETED")
                    .map((investment) => (
                      <Card key={investment.id}>
                        <CardHeader className="pb-2">
                          <CardTitle>{investment.product.title}</CardTitle>
                          <CardDescription>
                            Completed: {new Date(investment.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Project Status</span>
                                <span className="font-medium text-green-600">Completed</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div className="h-full w-full rounded-full bg-green-500"></div>
                              </div>
                            </div>
                            <div className="pt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Initial Investment</span>
                                <span>{formatCurrency(investment.amount)}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Final Return</span>
                                <span>
                                  {formatCurrency(
                                    investment.amount *
                                      (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle),
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">ROI</span>
                                <span className="text-green-600">
                                  {investment.product.returnPerCycle * investment.product.cycle}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Success Story
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                  {investments.filter((investment) => investment.status === "COMPLETED").length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">You don't have any completed investments yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="upcoming" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Sustainable Textile Dyes</CardTitle>
                      <CardDescription>Launching: Q3 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Research Status</span>
                            <span className="font-medium">90%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Target</span>
                            <span className="font-medium">$800,000</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[10%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                          <p className="text-xs text-muted-foreground">10% pre-funded • $80,000</p>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Minimum Investment</span>
                            <span>$100,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Projected ROI</span>
                            <span>20-25%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Investment Window</span>
                            <span>Opens Aug 2024</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Request Prospectus
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Advanced Polymer Composites</CardTitle>
                      <CardDescription>Launching: Q4 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Research Status</span>
                            <span className="font-medium">75%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Target</span>
                            <span className="font-medium">$1,200,000</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[5%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                          <p className="text-xs text-muted-foreground">5% pre-funded • $60,000</p>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Minimum Investment</span>
                            <span>$150,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Projected ROI</span>
                            <span>18-22%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Investment Window</span>
                            <span>Opens Oct 2024</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Request Prospectus
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Biodegradable Plastics</CardTitle>
                      <CardDescription>Launching: Q1 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Research Status</span>
                            <span className="font-medium">60%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Target</span>
                            <span className="font-medium">$950,000</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[2%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                          <p className="text-xs text-muted-foreground">2% pre-funded • $19,000</p>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Minimum Investment</span>
                            <span>$75,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Projected ROI</span>
                            <span>22-28%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Investment Window</span>
                            <span>Opens Jan 2025</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Request Prospectus
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div> */}
        </div>
      </main>
      <div className="mt-8 container mx-auto">
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
      <footer className="w-full border-t bg-background">
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
      </footer>
    </div>
  )
}



// import Link from "next/link"
// import Image from "next/image"
// import { ArrowLeft, ArrowUpRight, ChevronDown, Download, LineChart as LineIcon, PieChart, TrendingUp, Users } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { redirect } from "next/navigation"
// import { getInvestmentsByUserId } from "@/lib/investment"
// import { getWalletByUserId } from "@/lib/wallet"
// import { getUserById } from "@/lib/user"
// import { formatCurrency } from "@/lib/utils"
// import type { ChartDataPoint, InvestmentWithProduct, Wallet } from "@/types"
// import DashboardFooter from "./_components/DashboardFooter"
// import DashboardHeader from "./_components/DashboardHeader"

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions)

//   if (!session || !session.user.id) {
//     redirect("/login")
//   }

//   const user = await getUserById(session.user.id)
//   const investments = (await getInvestmentsByUserId(session.user.id)) as InvestmentWithProduct[]
//   const wallet = (await getWalletByUserId(session.user.id)) as Wallet | null

//   // Calculate total investment
//   const totalInvestment = investments.reduce((total, investment) => total + investment.amount, 0)

//   // Calculate active projects
//   const activeProjects = investments.filter((investment) => investment.status === "ACTIVE").length

//   // Calculate average ROI
//   const averageROI =
//     investments.length > 0
//       ? investments.reduce((total, investment) => total + investment.product.returnPerCycle, 0) / investments.length
//       : 0

//   // Calculate projected returns
//   const projectedReturns = investments.reduce((total, investment) => {
//     const returnPerCycle = investment.product.returnPerCycle / 100
//     return total + investment.amount * (1 + returnPerCycle) * investment.product.cycle
//   }, 0)

//   // Prepare chart data
//   const monthlyReturnsData = [
//     { name: "Jan", value: 2500 },
//     { name: "Feb", value: 3200 },
//     { name: "Mar", value: 2800 },
//     { name: "Apr", value: 4200 },
//     { name: "May", value: 3800 },
//     { name: "Jun", value: 4800 },
//     { name: "Jul", value: 5200 },
//     { name: "Aug", value: 4900 },
//     { name: "Sep", value: 5800 },
//     { name: "Oct", value: 6200 },
//     { name: "Nov", value: 6800 },
//     { name: "Dec", value: 7500 },
//   ]

//   // Prepare allocation data
//   const allocationData: ChartDataPoint[] = investments.map((investment) => ({
//     name: investment.product.title,
//     value: investment.amount,
//   }))

//   return (
//     <div className="flex min-h-screen flex-col">
//       <DashboardHeader user={user} />
//       <main className="flex-1 bg-muted/40">
//         <div className="container mx-auto py-6">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
//             <p className="text-muted-foreground">Track your investments and monitor product development progress.</p>
//           </div>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {wallet ? `Balance: ${formatCurrency(wallet.balance)}` : "No wallet found"}
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{activeProjects}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {investments.length > 0 ? `${investments.length} total investments` : "No investments yet"}
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
//                 <PieChart className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{averageROI.toFixed(1)}%</div>
//                 <p className="text-xs text-muted-foreground">Per investment cycle</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Projected Returns</CardTitle>
//                 <LineIcon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{formatCurrency(projectedReturns)}</div>
//                 <p className="text-xs text-muted-foreground">At maturity</p>
//               </CardContent>
//             </Card>
//           </div>
//           <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="lg:col-span-4">
//               <CardHeader>
//                 <CardTitle>Investment Performance</CardTitle>
//                 <CardDescription>Monthly returns across all projects</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {/* <div className="h-[300px]">
//                   <LineChart
                    
//                     data={monthlyReturnsData}
//                     index="name"
//                     categories={["value"]}
//                     colors={["#0ea5e9"]}
//                     valueFormatter={(value) => `$${value.toLocaleString()}`}
//                     showLegend={false}
//                     showXAxis
//                     showYAxis
//                     showGridLines
//                   />
//                 </div> */}
//               </CardContent>
//             </Card>
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle>Project Allocation</CardTitle>
//                 <CardDescription>Current investment distribution</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {/* <div className="h-[300px]">
//                   {allocationData.length > 0 ? (
//                     <Pie
//                       data={allocationData}
//                       index="name"
//                       valueFormatter={(value) => `$${value.toLocaleString()}`}
//                       category="value"
//                       colors={["#0ea5e9", "#14b8a6", "#6366f1", "#8b5cf6", "#ec4899"]}
//                     />
//                   ) : (
//                     <div className="flex h-full items-center justify-center">
//                       <p className="text-sm text-muted-foreground">No investment data available</p>
//                     </div>
//                   )}
//                 </div> */}
//               </CardContent>
//             </Card>
//           </div>
//           <div className="mt-8">
//             <Tabs defaultValue="active">
//               <div className="flex items-center justify-between">
//                 <TabsList>
//                   <TabsTrigger value="active">Active Projects</TabsTrigger>
//                   <TabsTrigger value="completed">Completed Projects</TabsTrigger>
//                   <TabsTrigger value="upcoming">Upcoming Opportunities</TabsTrigger>
//                 </TabsList>
//               </div>
//               <TabsContent value="active" className="mt-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {investments
//                     .filter((investment) => investment.status === "ACTIVE")
//                     .map((investment) => (
//                       <Card key={investment.id}>
//                         <CardHeader className="pb-2">
//                           <CardTitle>{investment.product.title}</CardTitle>
//                           <CardDescription>
//                             Started: {new Date(investment.createdAt).toLocaleDateString()}
//                           </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                           <div className="space-y-4">
//                             <div className="space-y-2">
//                               <div className="flex items-center justify-between text-sm">
//                                 <span>Development Progress</span>
//                                 <span className="font-medium">
//                                   {Math.round(
//                                     (investment.product.currentAmount / investment.product.targetAmount) * 100,
//                                   )}
//                                   %
//                                 </span>
//                               </div>
//                               <div className="h-2 w-full rounded-full bg-muted">
//                                 <div
//                                   className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-600"
//                                   style={{
//                                     width: `${Math.round((investment.product.currentAmount / investment.product.targetAmount) * 100)}%`,
//                                   }}
//                                 ></div>
//                               </div>
//                             </div>
//                             <div className="pt-2">
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Your Investment</span>
//                                 <span>{formatCurrency(investment.amount)}</span>
//                               </div>
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Units</span>
//                                 <span>{investment.units}</span>
//                               </div>
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Expected ROI</span>
//                                 <span>{investment.product.returnPerCycle}%</span>
//                               </div>
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Cycle</span>
//                                 <span>{investment.product.cycle} months</span>
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                         <CardFooter>
//                           <Button variant="outline" className="w-full">
//                             View Detailed Report
//                             <ArrowUpRight className="ml-2 h-4 w-4" />
//                           </Button>
//                         </CardFooter>
//                       </Card>
//                     ))}

//                   {investments.filter((investment) => investment.status === "ACTIVE").length === 0 && (
//                     <div className="col-span-full text-center py-8">
//                       <p className="text-muted-foreground">You don't have any active investments.</p>
//                       <Button asChild className="mt-4 bg-gradient-to-r from-teal-500 to-blue-600">
//                         <Link href="/products">Browse Investment Opportunities</Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>
//               <TabsContent value="completed" className="mt-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {investments
//                     .filter((investment) => investment.status === "COMPLETED")
//                     .map((investment) => (
//                       <Card key={investment.id}>
//                         <CardHeader className="pb-2">
//                           <CardTitle>{investment.product.title}</CardTitle>
//                           <CardDescription>
//                             Completed: {new Date(investment.updatedAt).toLocaleDateString()}
//                           </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                           <div className="space-y-4">
//                             <div className="space-y-2">
//                               <div className="flex items-center justify-between text-sm">
//                                 <span>Project Status</span>
//                                 <span className="font-medium text-green-600">Completed</span>
//                               </div>
//                               <div className="h-2 w-full rounded-full bg-muted">
//                                 <div className="h-full w-full rounded-full bg-green-500"></div>
//                               </div>
//                             </div>
//                             <div className="pt-2">
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Initial Investment</span>
//                                 <span>{formatCurrency(investment.amount)}</span>
//                               </div>
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">Final Return</span>
//                                 <span>
//                                   {formatCurrency(
//                                     investment.amount *
//                                       (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle),
//                                   )}
//                                 </span>
//                               </div>
//                               <div className="flex items-center justify-between text-sm">
//                                 <span className="font-medium">ROI</span>
//                                 <span className="text-green-600">
//                                   {investment.product.returnPerCycle * investment.product.cycle}%
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                         <CardFooter>
//                           <Button variant="outline" className="w-full">
//                             View Success Story
//                             <ArrowUpRight className="ml-2 h-4 w-4" />
//                           </Button>
//                         </CardFooter>
//                       </Card>
//                     ))}

//                   {investments.filter((investment) => investment.status === "COMPLETED").length === 0 && (
//                     <div className="col-span-full text-center py-8">
//                       <p className="text-muted-foreground">You don't have any completed investments yet.</p>
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>
//               <TabsContent value="upcoming" className="mt-6">
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardTitle>Sustainable Textile Dyes</CardTitle>
//                       <CardDescription>Launching: Q3 2024</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Research Status</span>
//                             <span className="font-medium">90%</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Funding Target</span>
//                             <span className="font-medium">₦800,000</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[10%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                           <p className="text-xs text-muted-foreground">10% pre-funded • ₦80,000</p>
//                         </div>
//                         <div className="pt-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Minimum Investment</span>
//                             <span>₦100,000</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Projected ROI</span>
//                             <span>20-25%</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Investment Window</span>
//                             <span>Opens Aug 2024</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button variant="outline" className="w-full">
//                         Request Prospectus
//                         <ArrowUpRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardTitle>Advanced Polymer Composites</CardTitle>
//                       <CardDescription>Launching: Q4 2024</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Research Status</span>
//                             <span className="font-medium">75%</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Funding Target</span>
//                             <span className="font-medium">₦1,200,000</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[5%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                           <p className="text-xs text-muted-foreground">5% pre-funded • ₦60,000</p>
//                         </div>
//                         <div className="pt-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Minimum Investment</span>
//                             <span>₦150,000</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Projected ROI</span>
//                             <span>18-22%</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Investment Window</span>
//                             <span>Opens Oct 2024</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button variant="outline" className="w-full">
//                         Request Prospectus
//                         <ArrowUpRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                   <Card>
//                     <CardHeader className="pb-2">
//                       <CardTitle>Biodegradable Plastics</CardTitle>
//                       <CardDescription>Launching: Q1 2025</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Research Status</span>
//                             <span className="font-medium">60%</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Funding Target</span>
//                             <span className="font-medium">₦950,000</span>
//                           </div>
//                           <div className="h-2 w-full rounded-full bg-muted">
//                             <div className="h-full w-[2%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
//                           </div>
//                           <p className="text-xs text-muted-foreground">2% pre-funded • ₦19,000</p>
//                         </div>
//                         <div className="pt-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Minimum Investment</span>
//                             <span>₦75,000</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Projected ROI</span>
//                             <span>22-28%</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="font-medium">Investment Window</span>
//                             <span>Opens Jan 2025</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button variant="outline" className="w-full">
//                         Request Prospectus
//                         <ArrowUpRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </main>
//       <DashboardFooter />
//     </div>
//   )
// }


