import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, DollarSign, LineChart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
// import { InvestmentForm } from "./investment-form"
import { InvestmentForm } from "../investment-form"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return product
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  const session = await getServerSession(authOptions)

  // Calculate expected returns
  const expectedReturn = (product.unitAmount * (1 + (product.returnPerCycle / 100) * product.cycle)).toFixed(2)
  const profit = (product.unitAmount * (product.returnPerCycle / 100) * product.cycle).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-white">
      <main className="container mx-auto py-12">
        <div className="mb-8">
          <Link href="/products" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">{product.title}</h1>
              <p className="text-muted-foreground">
                {product.cycle} month investment cycle • {product.returnPerCycle}% return per cycle
              </p>
            </div>
            <Badge className="self-start md:self-auto" variant={product.status === "ACTIVE" ? "default" : "outline"}>
              {product.status}
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Progress</CardTitle>
                <CardDescription>Current funding status and target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Funding Progress</span>
                    <span className="font-medium">
                      {Math.round((product.currentAmount / product.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                      style={{ width: `${Math.round((product.currentAmount / product.targetAmount) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{formatCurrency(product.currentAmount)} raised</span>
                    <span>{formatCurrency(product.targetAmount)} target</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">High Returns</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn {product.returnPerCycle}% per cycle, significantly higher than traditional investments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Fixed Term</h3>
                      <p className="text-sm text-muted-foreground">
                        Clear {product.cycle}-month investment cycle with defined returns.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accessible Entry</h3>
                      <p className="text-sm text-muted-foreground">
                        Start with just {formatCurrency(product.unitAmount)} per investment unit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Transparent Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor your investment performance in real-time through our dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Unit price and expected returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unit Price</span>
                    <span className="font-medium">{formatCurrency(product.unitAmount)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Return Rate</span>
                    <span className="font-medium">{product.returnPerCycle}% per cycle</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cycle Duration</span>
                    <span className="font-medium">{product.cycle} months</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expected Return (1 unit)</span>
                    <span className="font-medium">{formatCurrency(Number(expectedReturn))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profit (1 unit)</span>
                    <span className="font-medium text-green-600">+{formatCurrency(Number(profit))}</span>
                  </div>
                </div>

                {product.status === "ACTIVE" ? (
                  session ? (
                    <InvestmentForm productId={product.id} unitAmount={product.unitAmount} />
                  ) : (
                    <div className="space-y-4">
                      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-violet-600">
                        <Link href={`/login?callbackUrl=/products/${product.id}`}>
                          Login to Invest
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline">
                          Sign up
                        </Link>{" "}
                        to start investing.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="rounded-lg bg-muted p-4 text-center">
                    <p className="text-sm font-medium">
                      This investment opportunity is currently {product.status.toLowerCase()}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Please explore our other active opportunities.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full border-t bg-background mt-12">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Commodex. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

