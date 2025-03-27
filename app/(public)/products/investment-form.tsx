"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"
// import { investAction } from "@/actions/investment"
import { investAction } from "@/actions/investment"

const investmentFormSchema = z.object({
  units: z.coerce.number().int().positive({
    message: "Units must be a positive integer.",
  }),
})

type InvestmentFormValues = z.infer<typeof investmentFormSchema>

interface InvestmentFormProps {
  productId: string
  unitAmount: number
}

export function InvestmentForm({ productId, unitAmount }: InvestmentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calculatedAmount, setCalculatedAmount] = useState(unitAmount)

  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      units: 1,
    },
  })

  const watchUnits = form.watch("units")

  // Update calculated amount when units change
  useState(() => {
    if (watchUnits && !isNaN(watchUnits)) {
      setCalculatedAmount(unitAmount * watchUnits)
    }
  })

  async function onSubmit(data: InvestmentFormValues) {
    setIsSubmitting(true)

    try {
      const result = await investAction(productId, data.units)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Investment successful",
        description: "Your investment has been processed successfully.",
      })

      router.push("/dashboard/investments")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Units</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    const units = Number.parseInt(e.target.value)
                    if (!isNaN(units)) {
                      setCalculatedAmount(unitAmount * units)
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Total investment: {formatCurrency(calculatedAmount)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Invest Now"}
        </Button>
      </form>
    </Form>
  )
}

