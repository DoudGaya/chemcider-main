"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { initiateInvestment } from "./actions"
import type { Product } from "@prisma/client"

interface InvestmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  opportunity: Product
  walletBalance: number
  userId: string
  onSuccess: () => void
}

export function InvestmentModal({
  open,
  onOpenChange,
  opportunity,
  walletBalance,
  userId,
  onSuccess,
}: InvestmentModalProps) {
  const router = useRouter()
  const [units, setUnits] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate investment amount based on units
  const investmentAmount = units * opportunity.unitAmount

  // Calculate expected return
  const expectedReturn = investmentAmount * (1 + (opportunity.returnPerCycle / 100) * opportunity.cycle)

  // Calculate profit
  const profit = expectedReturn - investmentAmount

  // Check if user has enough balance
  const hasEnoughBalance = walletBalance >= investmentAmount

  // Reset units when modal opens
  useEffect(() => {
    if (open) {
      setUnits(1)
    }
  }, [open])

  // Calculate max units user can afford
  const maxAffordableUnits = Math.floor(walletBalance / opportunity.unitAmount)

  const handleUnitChange = (value: number[]) => {
    setUnits(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setUnits(Math.min(value, maxAffordableUnits))
    }
  }

  const handleInvest = async () => {
    if (!hasEnoughBalance) {
      toast({
        title: "Insufficient balance",
        description: "Please add funds to your wallet to complete this investment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await initiateInvestment({
        productId: opportunity.id,
        units,
        userId,
      })

      if (result.error) {
        toast({
          title: "Investment failed",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Investment successful",
        description: "Your investment has been processed successfully.",
      })

      onSuccess()
      onOpenChange(false)

      // Redirect to the investment details page
      router.push(`/dashboard/investments/${result.investmentId}`)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {opportunity.title}</DialogTitle>
          <DialogDescription>Adjust the number of units you want to invest in.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="units">Number of Units</Label>
            <div className="flex items-center gap-2">
              <Input
                id="units"
                type="number"
                min={1}
                max={maxAffordableUnits}
                value={units}
                onChange={handleInputChange}
                className="w-20"
              />
              <Slider
                value={[units]}
                min={1}
                max={Math.max(maxAffordableUnits, 1)}
                step={1}
                onValueChange={handleUnitChange}
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <Label className="text-muted-foreground">Unit Price</Label>
              <p className="font-medium">{formatCurrency(opportunity.unitAmount)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Total Investment</Label>
              <p className="font-medium">{formatCurrency(investmentAmount)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Expected Return</Label>
              <p className="font-medium">{formatCurrency(expectedReturn)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Profit</Label>
              <p className="font-medium text-green-600">+{formatCurrency(profit)}</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span>Your wallet balance:</span>
              <span className="font-medium">{formatCurrency(walletBalance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining after investment:</span>
              <span className={`font-medium ${!hasEnoughBalance ? "text-red-500" : ""}`}>
                {formatCurrency(walletBalance - investmentAmount)}
              </span>
            </div>
          </div>

          {!hasEnoughBalance && (
            <p className="text-sm text-red-500">Insufficient balance. Please add funds to your wallet.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleInvest}
            disabled={!hasEnoughBalance || isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-violet-600"
          >
            {isSubmitting ? "Processing..." : "Confirm Investment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

