import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, ChevronDown, Download, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <div className="relative">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="User avatar"
                  className="rounded-full"
                />
                <span>John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
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
                <div className="text-2xl font-bold">$1,250,000</div>
                <p className="text-xs text-muted-foreground">+15% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 new project this quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% from previous projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Returns</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,350,000</div>
                <p className="text-xs text-muted-foreground">Expected by Q4 2025</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Investment Performance</CardTitle>
                <CardDescription>Monthly returns across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-dashed flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Performance Chart Visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Project Allocation</CardTitle>
                <CardDescription>Current investment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-md border border-dashed flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Allocation Chart Visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
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
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Eco-Friendly Industrial Solvents</CardTitle>
                      <CardDescription>Started: Jan 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Development Progress</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Status</span>
                            <span className="font-medium">75%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Your Investment</span>
                            <span>$500,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Expected ROI</span>
                            <span>22%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Launch Date</span>
                            <span>Q3 2024</span>
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
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Advanced Agricultural Fertilizers</CardTitle>
                      <CardDescription>Started: Mar 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Development Progress</span>
                            <span className="font-medium">60%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Status</span>
                            <span className="font-medium">50%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Your Investment</span>
                            <span>$350,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Expected ROI</span>
                            <span>18%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Launch Date</span>
                            <span>Q1 2025</span>
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
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Pharmaceutical Intermediates</CardTitle>
                      <CardDescription>Started: Jun 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Development Progress</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Funding Status</span>
                            <span className="font-medium">25%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full w-[25%] rounded-full bg-gradient-to-r from-teal-500 to-blue-600"></div>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Your Investment</span>
                            <span>$400,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Expected ROI</span>
                            <span>25%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Launch Date</span>
                            <span>Q2 2025</span>
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
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Bio-degradable Packaging Materials</CardTitle>
                      <CardDescription>Completed: Dec 2022</CardDescription>
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
                            <span>$300,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Final Return</span>
                            <span>$645,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">ROI</span>
                            <span className="text-green-600">215%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Current Status</span>
                            <span>In Market</span>
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
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Water Treatment Chemicals</CardTitle>
                      <CardDescription>Completed: Aug 2021</CardDescription>
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
                            <span>$250,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Final Return</span>
                            <span>$450,000</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">ROI</span>
                            <span className="text-green-600">180%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Current Status</span>
                            <span>Exported to 5 Countries</span>
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
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

