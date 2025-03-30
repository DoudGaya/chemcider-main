import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, LineChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { OpportunityInvestButton } from "./opportunity-invest-button"

interface OpportunityPageProps {
  params: {
    id: string
  }
}

async function getOpportunity(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return product
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    notFound()
  }

  const opportunity = await getOpportunity(params.id)

  // Get user wallet balance
  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
  })

  // Calculate expected returns
  const expectedReturn = (
    opportunity.unitAmount *
    (1 + (opportunity.returnPerCycle / 100) * opportunity.cycle)
  ).toFixed(2)
  const profit = (opportunity.unitAmount * (opportunity.returnPerCycle / 100) * opportunity.cycle).toFixed(2)

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/opportunities"
          className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Opportunities
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">{opportunity.title}</h1>
            <p className="text-muted-foreground">
              {opportunity.cycle} month investment cycle • {opportunity.returnPerCycle}% return per cycle
            </p>
          </div>
          <Badge className="self-start md:self-auto" variant={opportunity.status === "ACTIVE" ? "default" : "outline"}>
            {opportunity.status}
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
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: opportunity.description }} />
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
                    {Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                    style={{ width: `${Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{formatCurrency(opportunity.currentAmount)} raised</span>
                  <span>{formatCurrency(opportunity.targetAmount)} target</span>
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
                      Earn {opportunity.returnPerCycle}% per cycle, significantly higher than traditional investments.
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
                      Clear {opportunity.cycle}-month investment cycle with defined returns.
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
                      Start with just {formatCurrency(opportunity.unitAmount)} per investment unit.
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
                  <span className="font-medium">{formatCurrency(opportunity.unitAmount)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Return Rate</span>
                  <span className="font-medium">{opportunity.returnPerCycle}% per cycle</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cycle Duration</span>
                  <span className="font-medium">{opportunity.cycle} months</span>
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

              <div className="rounded-lg bg-muted p-4 text-sm">
                <div className="flex justify-between mb-2">
                  <span>Your wallet balance:</span>
                  <span className="font-medium">{formatCurrency(wallet?.balance || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max units you can buy:</span>
                  <span className="font-medium">{Math.floor((wallet?.balance || 0) / opportunity.unitAmount)}</span>
                </div>
              </div>

              {opportunity.status === "ACTIVE" ? (
                <OpportunityInvestButton
                  opportunity={opportunity}
                  walletBalance={wallet?.balance || 0}
                  userId={session.user.id}
                />
              ) : (
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm font-medium">
                    This investment opportunity is currently {opportunity.status.toLowerCase()}.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Please explore our other active opportunities.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

