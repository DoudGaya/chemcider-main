import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"

interface InvestmentPageProps {
  params: {
    id: string
  }
}

async function getInvestment(id: string) {
  const investment = await prisma.investment.findUnique({
    where: { id },
    include: {
      user: true,
      product: true,
    },
  })

  if (!investment) {
    notFound()
  }

  return investment
}

export default async function InvestmentPage({ params }: InvestmentPageProps) {
  const investment = await getInvestment(params.id)

  const expectedReturn = investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle)

  return (
    <div className="container max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/admin/investments">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Investments
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Investment Details</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Summary</CardTitle>
            <CardDescription>Created on {new Date(investment.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge className="mt-1">{investment.status}</Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Investment ID</h3>
                <p className="mt-1 font-mono text-sm">{investment.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(investment.amount)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Units</h3>
                <p className="mt-1 text-lg font-semibold">{investment.units}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Expected Return</h3>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(expectedReturn)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ROI</h3>
                <p className="mt-1 text-lg font-semibold">
                  {investment.product.returnPerCycle * investment.product.cycle}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                <Link href={`/admin/products/${investment.productId}`} className="text-primary hover:underline">
                  View Product
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                  <p className="mt-1 font-semibold">{investment.product.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Cycle</h3>
                  <p className="mt-1">{investment.product.cycle} months</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Return Per Cycle</h3>
                  <p className="mt-1">{investment.product.returnPerCycle}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Product Status</h3>
                  <Badge className="mt-1" variant="outline">
                    {investment.product.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investor Information</CardTitle>
              <CardDescription>
                <Link href={`/admin/users/${investment.userId}`} className="text-primary hover:underline">
                  View Investor
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="mt-1 font-semibold">{investment.user.name || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="mt-1">{investment.user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Referral Code</h3>
                  <p className="mt-1 font-mono text-sm">{investment.user.referralCode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
                  <p className="mt-1">{new Date(investment.user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

