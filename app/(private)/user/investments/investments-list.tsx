"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { FileText, TrendingUp } from "lucide-react"
import type { Investment, Product } from "@prisma/client"

interface InvestmentsListProps {
  investments: (Investment & { product: Product })[]
  totalInvested: number
  totalExpectedReturn: number
}

export function InvestmentsList({ investments, totalInvested, totalExpectedReturn }: InvestmentsListProps) {
  const [filter, setFilter] = useState<string>("all")

  // Filter investments based on status
  const filteredInvestments = investments.filter((investment) => {
    if (filter === "all") return true
    return investment.status === filter.toUpperCase()
  })

  // Calculate profit
  const totalProfit = totalExpectedReturn - totalInvested

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
            <p className="text-xs text-muted-foreground">
              Across {investments.length} investment{investments.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expected Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpectedReturn)}</div>
            <p className="text-xs text-muted-foreground">At the end of investment cycles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projected Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{formatCurrency(totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalProfit / totalInvested) * 100).toFixed(2)}% return on investment
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}

            {filteredInvestments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No investments found.</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/opportunities">Explore Opportunities</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}

            {filteredInvestments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No active investments found.</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/opportunities">Explore Opportunities</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}

            {filteredInvestments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No completed investments found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface InvestmentCardProps {
  investment: Investment & { product: Product }
}

function InvestmentCard({ investment }: InvestmentCardProps) {
  // Calculate expected return
  const expectedReturn = investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle)

  // Calculate profit
  const profit = expectedReturn - investment.amount

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{investment.product.title}</CardTitle>
          <Badge variant={investment.status === "ACTIVE" ? "default" : "outline"}>{investment.status}</Badge>
        </div>
        <CardDescription>
          {investment.product.cycle} month cycle • {investment.product.returnPerCycle}% return
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Invested</p>
              <p className="font-medium">{formatCurrency(investment.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Units</p>
              <p className="font-medium">{investment.units}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Return</p>
              <p className="font-medium">{formatCurrency(expectedReturn)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profit</p>
              <p className="font-medium text-green-600">+{formatCurrency(profit)}</p>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>Invested on {new Date(investment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/dashboard/investments/${investment.id}`}>
              <FileText className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

