"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

interface UserReferralSectionProps {
  referralCode: string
  referralCount: number
  referralBalance: number
  hasReferralBonus: boolean
}

export function UserReferralSection({
  referralCode,
  referralCount,
  referralBalance,
  hasReferralBonus,
}: UserReferralSectionProps) {
  const [copied, setCopied] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const referralUrl = `${appUrl}/register?ref=${referralCode}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      })
    }
  }

  const handleTransferBonus = async () => {
    if (!hasReferralBonus) return

    setIsTransferring(true)
    try {
      const response = await fetch("/api/wallet/transfer-referral-bonus", {
        method: "POST",
      })

      const data = await response.json()

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Referral bonus transferred to your main balance",
      })

      // Refresh the page to update balances
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer referral bonus",
        variant: "destructive",
      })
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Friends & Earn</CardTitle>
        <CardDescription>
          Share your referral link and earn $10 for each new investor who signs up and makes an investment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex">
            <Input value={referralUrl} readOnly className="rounded-r-none" />
            <Button onClick={copyToClipboard} variant="outline" className="rounded-l-none">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">Referrals</div>
            <div className="text-2xl font-bold">{referralCount}</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">Referral Bonus</div>
            <div className="text-2xl font-bold">{formatCurrency(referralBalance)}</div>
          </div>
        </div>

        {hasReferralBonus && (
          <Button onClick={handleTransferBonus} className="w-full" disabled={isTransferring}>
            {isTransferring ? "Transferring..." : "Transfer Bonus to Main Balance"}
          </Button>
        )}

        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="font-medium mb-2">How it works:</p>
          <ol className=" list-disc grid grid-cols-2 pl-5 space-y-1">
            <li>Share your unique referral link with friends</li>
            <li>They sign up and make an investment</li>
            <li>You earn $10 for each successful referral</li>
            <li>Transfer your earnings to your main balance</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}

