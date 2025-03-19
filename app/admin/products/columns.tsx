"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
// import { deleteProduct } from "@/actions/product"
import { deleteProduct } from "@/lib/products"
import { toast } from "@/components/ui/use-toast"

export type ProductData = {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  unitAmount: number
  cycle: number
  returnPerCycle: number
  status: string
  createdAt: string
  updatedAt: string
  formattedTargetAmount: string
  formattedCurrentAmount: string
  formattedUnitAmount: string
  progress: number
}

export const ProductColumns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Link href={`/admin/products/${row.original.id}`} className="hover:underline">
            {row.original.title}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "formattedTargetAmount",
    header: "Target Amount",
  },
  {
    accessorKey: "progress",
    header: "Funding Progress",
    cell: ({ row }) => {
      const progress = row.original.progress
      return (
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span>{progress}%</span>
            <span>
              {row.original.formattedCurrentAmount} / {row.original.formattedTargetAmount}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )
    },
  },
  {
    accessorKey: "cycle",
    header: "Cycle (Months)",
  },
  {
    accessorKey: "returnPerCycle",
    header: "Return (%)",
    cell: ({ row }) => {
      return <div>{row.original.returnPerCycle}%</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default"

      switch (status) {
        case "ACTIVE":
          badgeVariant = "default"
          break
        case "FUNDED":
          badgeVariant = "secondary"
          break
        case "COMPLETED":
          badgeVariant = "outline"
          break
        default:
          badgeVariant = "default"
      }

      return <Badge variant={badgeVariant}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${product.title}?`)) {
          try {
            await deleteProduct(product.id)
            toast({
              title: "Product deleted",
              description: `${product.title} has been deleted successfully.`,
            })
            // Refresh the page
            window.location.reload()
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to delete product. It may have active investments.",
              variant: "destructive",
            })
          }
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${product.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

