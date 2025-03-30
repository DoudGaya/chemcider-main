"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InvestmentModal } from "../investment-modal"
import type { Product } from "@prisma/client"

interface OpportunityInvestButtonProps {
  opportunity: Product
  walletBalance: number
  userId: string
}

export function OpportunityInvestButton({ opportunity, walletBalance, userId }: OpportunityInvestButtonProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600" onClick={() => setIsModalOpen(true)}>
        Invest Now
      </Button>

      <InvestmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        opportunity={opportunity}
        walletBalance={walletBalance}
        userId={userId}
        onSuccess={() => {
          router.refresh()
        }}
      />
    </>
  )
}

