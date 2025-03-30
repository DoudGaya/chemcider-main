"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { initiateFunding } from "./actions"

const fundingFormSchema = z.object({
  amount: z.coerce
    .number()
    .positive({
      message: "Amount must be positive",
    })
    .min(1000, {
      message: "Minimum funding amount is ₦1,000",
    }),
})

type FundingFormValues = z.infer<typeof fundingFormSchema>

interface WalletFundingFormProps {
  userId: string
  userEmail: string
}

export function WalletFundingForm({ userId, userEmail }: WalletFundingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingFormSchema),
    defaultValues: {
      amount: 5000,
    },
  })

  async function onSubmit(data: FundingFormValues) {
    setIsSubmitting(true)

    try {
      const result = await initiateFunding({
        userId,
        email: userEmail,
        amount: data.amount,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      // Redirect to Paystack payment page
      window.location.href = result.authorizationUrl
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
    <Card>
      <CardHeader>
        <CardTitle>Fund Your Wallet</CardTitle>
        <CardDescription>Add funds to your wallet using Paystack</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1000} step={1000} {...field} />
                  </FormControl>
                  <FormDescription>Minimum amount is ₦1,000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Fund Wallet"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <span>Secured by Paystack</span>
        <span>Instant funding</span>
      </CardFooter>
    </Card>
  )
}

