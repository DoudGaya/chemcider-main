"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { InvestmentModal } from "./investment-modal"
import type { Product } from "@prisma/client"

interface OpportunitiesListProps {
  opportunities: Product[]
  walletBalance: number
  userId: string
}

export function OpportunitiesList({ opportunities, walletBalance, userId }: OpportunitiesListProps) {
  const router = useRouter()
  const [selectedOpportunity, setSelectedOpportunity] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<string>("all")

  // Filter opportunities based on status
  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (filter === "all") return true
    if (filter === "active") return opportunity.status === "ACTIVE"
    if (filter === "funded") return opportunity.status === "FUNDED"
    if (filter === "completed") return opportunity.status === "COMPLETED"
    return true
  })

  const handleInvest = (opportunity: Product) => {
    setSelectedOpportunity(opportunity)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="funded">Funded</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="text-sm text-muted-foreground">
            Your wallet balance: <span className="font-semibold">{formatCurrency(walletBalance)}</span>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} onInvest={handleInvest} />
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No investment opportunities found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} onInvest={handleInvest} />
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No active investment opportunities found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="funded" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} onInvest={handleInvest} />
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No funded investment opportunities found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} onInvest={handleInvest} />
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No completed investment opportunities found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedOpportunity && (
        <InvestmentModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          opportunity={selectedOpportunity}
          walletBalance={walletBalance}
          userId={userId}
          onSuccess={() => {
            router.refresh()
          }}
        />
      )}
    </div>
  )
}

interface OpportunityCardProps {
  opportunity: Product
  onInvest: (opportunity: Product) => void
}

function OpportunityCard({ opportunity, onInvest }: OpportunityCardProps) {
  const isActive = opportunity.status === "ACTIVE"

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{opportunity.title}</CardTitle>
          <Badge variant={isActive ? "default" : "outline"}>{opportunity.status}</Badge>
        </div>
        <CardDescription>
          {opportunity.cycle} month cycle • {opportunity.returnPerCycle}% return per cycle
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: opportunity.description }} />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Funding Progress</span>
              <span className="font-medium">
                {Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                style={{ width: `${Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(opportunity.currentAmount)} raised of {formatCurrency(opportunity.targetAmount)}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Unit Price</span>
            <span>{formatCurrency(opportunity.unitAmount)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/user/opportunities/${opportunity.id}`}>Details</Link>
          </Button>
          {isActive && (
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600"
              onClick={() => onInvest(opportunity)}
            >
              Invest
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

