"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { ArrowDown, ArrowUp, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@prisma/client"

interface TransactionsListProps {
  transactions: Transaction[]
  showPagination?: boolean
}

export function TransactionsList({ transactions, showPagination = false }: TransactionsListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate pagination
  const totalPages = showPagination ? Math.ceil(transactions.length / itemsPerPage) : 1
  const paginatedTransactions = showPagination
    ? transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : transactions

  if (transactions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {paginatedTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

interface TransactionItemProps {
  transaction: Transaction
}

function TransactionItem({ transaction }: TransactionItemProps) {
  // Determine transaction icon and color
  let Icon = ArrowDown
  let iconColor = "text-green-500"
  let bgColor = "bg-green-50"

  if (transaction.amount < 0) {
    Icon = ArrowUp
    iconColor = "text-red-500"
    bgColor = "bg-red-50"
  }

  if (transaction.type === "INVESTMENT") {
    Icon = TrendingUp
    iconColor = "text-blue-500"
    bgColor = "bg-blue-50"
  }

  if (transaction.type === "REFERRAL_BONUS") {
    Icon = Users
    iconColor = "text-purple-500"
    bgColor = "bg-purple-50"
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${bgColor}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.description || transaction.type}</p>
          <p className="text-xs text-muted-foreground">{new Date(transaction.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : ""}`}>
          {transaction.amount > 0 ? "+" : ""}
          {formatCurrency(transaction.amount)}
        </p>
        <Badge variant="outline" className="mt-1">
          {transaction.status}
        </Badge>
      </div>
    </div>
  )
}

