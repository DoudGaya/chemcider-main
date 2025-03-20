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
import Link from "next/link"

export type WalletData = {
  id: string
  userId: string
  balance: number
  referralBalance: number
  createdAt: string
  updatedAt: string
  formattedBalance: string
  formattedReferralBalance: string
  userName: string
  userEmail: string
  transactionCount: number
  user: {
    id: string
    name: string | null
    email: string
  }
}

export const WalletColumns: ColumnDef<WalletData>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="font-medium">
            <Link href={`/admin/users/${row.original.userId}`} className="hover:underline">
              {row.original.userName}
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">{row.original.userEmail}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "formattedBalance",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "formattedReferralBalance",
    header: "Referral Balance",
  },
  {
    accessorKey: "transactionCount",
    header: "Transactions",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wallet = row.original

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
              <Link href={`/admin/wallets/${wallet.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Transactions
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${wallet.userId}`}>
                <Eye className="mr-2 h-4 w-4" />
                View User
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

