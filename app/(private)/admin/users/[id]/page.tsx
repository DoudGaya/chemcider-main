import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { DataTable } from "@/components/data-table"
import { InvestmentColumns } from "../../investments/columns"

interface UserPageProps {
  params: {
    id: string
  }
}

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      wallet: {
        include: {
          transactions: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      investments: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      referrals: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!user) {
    notFound()
  }

  return user
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUser(params.id)

  const totalInvestment = user.investments.reduce((total, investment) => total + investment.amount, 0)

  const formattedInvestments = user.investments.map((investment) => ({
    ...investment,
    createdAt: investment.createdAt.toISOString(),
    updatedAt: investment.updatedAt.toISOString(),
    formattedAmount: formatCurrency(investment.amount),
    userName: user.name || "Unknown",
    userEmail: user.email,
    productTitle: investment.product.title,
    expectedReturn: formatCurrency(
      investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle),
    ),
  }))

  const formattedTransactions =
    user.wallet?.transactions.map((transaction) => ({
      ...transaction,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      formattedAmount: formatCurrency(transaction.amount),
    })) || []

  const transactionColumns = [
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: any) => {
        const type = row.original.type
        let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default"

        switch (type) {
          case "DEPOSIT":
            badgeVariant = "default"
            break
          case "WITHDRAWAL":
            badgeVariant = "destructive"
            break
          case "INVESTMENT":
            badgeVariant = "secondary"
            break
          case "REFERRAL_BONUS":
            badgeVariant = "outline"
            break
          default:
            badgeVariant = "default"
        }

        return <Badge variant={badgeVariant}>{type}</Badge>
      },
    },
    {
      accessorKey: "formattedAmount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status
        let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default"

        switch (status) {
          case "COMPLETED":
            badgeVariant = "default"
            break
          case "PENDING":
            badgeVariant = "secondary"
            break
          case "FAILED":
            badgeVariant = "destructive"
            break
          default:
            badgeVariant = "default"
        }

        return <Badge variant={badgeVariant}>{status}</Badge>
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: any) => {
        return new Date(row.original.createdAt).toLocaleDateString()
      },
    },
  ]

  const referralColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => {
        return (
          <div>
            <div className="font-medium">{row.original.name || "N/A"}</div>
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }: any) => {
        return new Date(row.original.createdAt).toLocaleDateString()
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        return (
          <Button asChild size="sm" variant="ghost">
            <Link href={`/admin/users/${row.original.id}`}>View</Link>
          </Button>
        )
      },
    },
  ]

  return (
    <div className="container max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/admin/users">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
        </div>
        <Link href={`/admin/users/${user.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex justify-center">
              <div className="relative h-24 w-24">
                <Image
                  src={user.image || "/placeholder.svg?height=96&width=96"}
                  alt={user.name || "User"}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <CardTitle className="text-center mt-2">{user.name || "No Name"}</CardTitle>
            <CardDescription className="text-center">{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <Badge className="mt-1">{user.role}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email Verified</h3>
                  {user.emailVerified ? (
                    <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1 bg-red-50 text-red-700">
                      No
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Referral Code</h3>
                <p className="mt-1 font-mono text-sm">{user.referralCode}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Joined</h3>
                <p className="mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Two-Factor Authentication</h3>
                {user.isTwoFactorEnabled ? (
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mt-1">
                    Disabled
                  </Badge>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground">Wallet Balance</h3>
                <p className="mt-1 text-2xl font-bold">{formatCurrency(user.wallet?.balance || 0)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Referral Balance</h3>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(user.wallet?.referralBalance || 0)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Investment</h3>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="investments" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
            </TabsList>

            <TabsContent value="investments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investments</CardTitle>
                  <CardDescription>
                    User has {user.investments.length} investment{user.investments.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.investments.length > 0 ? (
                    <DataTable columns={InvestmentColumns} 
                    // @ts-ignore
                    data={formattedInvestments} searchColumn="productTitle" />
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No investments found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    User has {formattedTransactions.length} transaction{formattedTransactions.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formattedTransactions.length > 0 ? (
                    <DataTable columns={transactionColumns} data={formattedTransactions} searchColumn="description" />
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No transactions found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referrals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referrals</CardTitle>
                  <CardDescription>
                    User has referred {user.referrals.length} user{user.referrals.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.referrals.length > 0 ? (
                    <DataTable
                      columns={referralColumns}
                      data={user.referrals.map((referral) => ({
                        ...referral,
                        createdAt: referral.createdAt.toISOString(),
                      }))}
                      searchColumn="email"
                    />
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No referrals found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

