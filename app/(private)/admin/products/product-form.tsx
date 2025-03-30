"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createProductAction, updateProductAction } from "@/actions/product"

const productFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  targetAmount: z.coerce.number().positive({
    message: "Target amount must be a positive number.",
  }),
  unitAmount: z.coerce.number().positive({
    message: "Unit amount must be a positive number.",
  }),
  cycle: z.coerce.number().int().positive({
    message: "Cycle must be a positive integer.",
  }),
  returnPerCycle: z.coerce.number().positive({
    message: "Return per cycle must be a positive number.",
  }),
  status: z.enum(["ACTIVE", "FUNDED", "COMPLETED"], {
    required_error: "Please select a status.",
  }),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductFormProps {
  product: any | null
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<ProductFormValues> = {
    title: product?.title || "",
    description: product?.description || "",
    targetAmount: product?.targetAmount || 0,
    unitAmount: product?.unitAmount || 0,
    cycle: product?.cycle || 3,
    returnPerCycle: product?.returnPerCycle || 0,
    status: product?.status || "ACTIVE",
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true)

    try {
      if (product) {
        // Update existing product
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value.toString())
        })

        const result = await updateProductAction(product.id, formData)

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        })
      } else {
        // Create new product
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value.toString())
        })

        const result = await createProductAction(formData)

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Product created",
          description: "The product has been created successfully.",
        })
      }

      router.push("/admin/products")
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormDescription>The name of the product as it will appear to investors.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed description of the product" className="min-h-32" {...field} />
              </FormControl>
              <FormDescription>
                Provide a detailed description of the product, its benefits, and potential returns.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount (₦
)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormDescription>The total funding target for this product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Amount (₦)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormDescription>The cost of a single investment unit.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cycle (Months)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormDescription>The investment cycle duration in months.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnPerCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Per Cycle (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" {...field} />
                </FormControl>
                <FormDescription>The percentage return per investment cycle.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="FUNDED">Funded</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The current status of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

