import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { InvestmentBarcode } from "./investment-barcode"
import { GenerateCertificateButton } from "./generate-certificate-button"

interface InvestmentPageProps {
  params: {
    id: string
  }
}

async function getInvestment(id: string, userId: string) {
  const investment = await prisma.investment.findUnique({
    where: {
      id,
      userId, // Ensure the investment belongs to the user
    },
    include: {
      product: true,
    },
  })

  if (!investment) {
    notFound()
  }

  return investment
}

export default async function InvestmentPage({ params }: InvestmentPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    notFound()
  }

  const investment = await getInvestment(params.id, session.user.id)

  // Calculate expected return
  const expectedReturn = investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle)

  // Calculate profit
  const profit = expectedReturn - investment.amount

  // Calculate maturity date
  const maturityDate = new Date(investment.createdAt)
  maturityDate.setMonth(maturityDate.getMonth() + investment.product.cycle)

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/investments"
          className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Investments
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">{investment.product.title}</h1>
            <p className="text-muted-foreground">Investment ID: {investment.id}</p>
          </div>
          <Badge className="self-start md:self-auto" variant={investment.status === "ACTIVE" ? "default" : "outline"}>
            {investment.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>Summary of your investment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Investment Amount</h3>
                  <p className="mt-1 text-lg font-semibold">{formatCurrency(investment.amount)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Units Purchased</h3>
                  <p className="mt-1 text-lg font-semibold">{investment.units}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Expected Return</h3>
                  <p className="mt-1 text-lg font-semibold">{formatCurrency(expectedReturn)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Profit</h3>
                  <p className="mt-1 text-lg font-semibold text-green-600">+{formatCurrency(profit)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Investment Date</h3>
                  <p className="mt-1">{new Date(investment.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Maturity Date</h3>
                  <p className="mt-1">{maturityDate.toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Details about the investment product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <div
                    className="mt-1 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: investment.product.description }}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cycle Duration</h3>
                    <p className="mt-1">{investment.product.cycle} months</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Return Per Cycle</h3>
                    <p className="mt-1">{investment.product.returnPerCycle}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Unit Price</h3>
                    <p className="mt-1">{formatCurrency(investment.product.unitAmount)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Product Status</h3>
                    <Badge className="mt-1" variant="outline">
                      {investment.product.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Investment Verification</CardTitle>
              <CardDescription>Unique barcode for your investment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <InvestmentBarcode barcode={investment.barcode || ""} />

              <Separator />

              <div className="space-y-4">
                <GenerateCertificateButton investment={investment} user={session.user} />

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/opportunities/${investment.productId}`}>View Opportunity</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

