"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
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
import Link from "next/link"

export type InvestmentData = {
  id: string
  userId: string
  productId: string
  amount: number
  units: number
  status: string
  createdAt: string
  updatedAt: string
  formattedAmount: string
  userName: string
  userEmail: string
  productTitle: string
  expectedReturn: string
  user: {
    id: string
    name: string | null
    email: string
  }
  product: {
    id: string
    title: string
    returnPerCycle: number
    cycle: number
  }
}

export const InvestmentColumns: ColumnDef<InvestmentData>[] = [
  {
    accessorKey: "productTitle",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Link href={`/admin/products/${row.original.productId}`} className="hover:underline">
            {row.original.productTitle}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Investor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/admin/users/${row.original.userId}`} className="hover:underline font-medium">
            {row.original.userName}
          </Link>
          <div className="text-xs text-muted-foreground">{row.original.userEmail}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "formattedAmount",
    header: "Amount",
  },
  {
    accessorKey: "units",
    header: "Units",
  },
  {
    accessorKey: "expectedReturn",
    header: "Expected Return",
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const investment = row.original

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
              <Link href={`/admin/investments/${investment.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

