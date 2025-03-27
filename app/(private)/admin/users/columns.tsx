
"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, UserCog } from "lucide-react"
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
import { formatCurrency } from "@/lib/utils"

export type UserData = {
  id: string
  name: string | null
  email: string
  userEmail: string // Add this field
  emailVerified: string | null
  role: string
  image: string | null
  referralCode: string
  referredBy: string | null
  isTwoFactorEnabled: boolean
  createdAt: string
  updatedAt: string
  referralCount: number
  investmentCount: number
  totalInvestment: number
  walletBalance: number
  referralBalance: number
}

export const UserColumns: ColumnDef<UserData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="font-medium">{row.original.name || "N/A"}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      )
    },
  },
  // Add this accessor for the email field
  {
    accessorKey: "userEmail",
    accessorFn: (row) => row.email, // Map to the actual email field
    header: "Email",
    enableHiding: true, // Hide this column from the table view
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role
      return <Badge variant={role === "ADMIN" ? "default" : "outline"}>{role}</Badge>
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.original.emailVerified
      return verified ? (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
          Yes
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
          No
        </Badge>
      )
    },
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: "2FA",
    cell: ({ row }) => {
      const enabled = row.original.isTwoFactorEnabled
      return enabled ? (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
          Enabled
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
          Disabled
        </Badge>
      )
    },
  },
  {
    accessorKey: "referralCount",
    header: "Referrals",
  },
  {
    accessorKey: "investmentCount",
    header: "Investments",
  },
  {
    accessorKey: "walletBalance",
    header: "Balance",
    cell: ({ row }) => {
      return formatCurrency(row.original.walletBalance)
    },
  },
  {
    accessorKey: "referralBalance",
    header: "Referral Bonus",
    cell: ({ row }) => {
      return formatCurrency(row.original.referralBalance)
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

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
              <Link href={`/admin/users/${user.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${user.id}/edit`}>
                <UserCog className="mr-2 h-4 w-4" />
                Edit User
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



// "use client"

// import type { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, MoreHorizontal, Eye, UserCog } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import { formatCurrency } from "@/lib/utils"

// export type UserData = {
//   id: string
//   name: string | null
//   email: string
//   emailVerified: string | null
//   role: string
//   image: string | null
//   referralCode: string
//   referredBy: string | null
//   isTwoFactorEnabled: boolean
//   createdAt: string
//   updatedAt: string
//   referralCount: number
//   investmentCount: number
//   totalInvestment: number
//   walletBalance: number
//   referralBalance: number
// }

// export const UserColumns: ColumnDef<UserData>[] = [
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => {
//       return (
//         <div>
//           <div className="font-medium">{row.original.name || "N/A"}</div>
//           <div className="text-xs text-muted-foreground">{row.original.email}</div>
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: "role",
//     header: "Role",
//     cell: ({ row }) => {
//       const role = row.original.role
//       return <Badge variant={role === "ADMIN" ? "default" : "outline"}>{role}</Badge>
//     },
//   },
//   {
//     accessorKey: "emailVerified",
//     header: "Verified",
//     cell: ({ row }) => {
//       const verified = row.original.emailVerified
//       return verified ? (
//         <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
//           Yes
//         </Badge>
//       ) : (
//         <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
//           No
//         </Badge>
//       )
//     },
//   },
//   {
//     accessorKey: "isTwoFactorEnabled",
//     header: "2FA",
//     cell: ({ row }) => {
//       const enabled = row.original.isTwoFactorEnabled
//       return enabled ? (
//         <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
//           Enabled
//         </Badge>
//       ) : (
//         <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
//           Disabled
//         </Badge>
//       )
//     },
//   },
//   {
//     accessorKey: "referralCount",
//     header: "Referrals",
//   },
//   {
//     accessorKey: "investmentCount",
//     header: "Investments",
//   },
//   {
//     accessorKey: "walletBalance",
//     header: "Balance",
//     cell: ({ row }) => {
//       return formatCurrency(row.original.walletBalance)
//     },
//   },
//   {
//     accessorKey: "referralBalance",
//     header: "Referral Bonus",
//     cell: ({ row }) => {
//       return formatCurrency(row.original.referralBalance)
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Joined",
//     cell: ({ row }) => {
//       return new Date(row.original.createdAt).toLocaleDateString()
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const user = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild>
//               <Link href={`/admin/users/${user.id}`}>
//                 <Eye className="mr-2 h-4 w-4" />
//                 View Details
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href={`/admin/users/${user.id}/edit`}>
//                 <UserCog className="mr-2 h-4 w-4" />
//                 Edit User
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]


