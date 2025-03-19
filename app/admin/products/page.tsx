import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { ProductColumns } from "./columns"

export const metadata = {
  title: "Products | Admin Dashboard",
  description: "Manage products on the Commodex platform",
}

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
}

export default async function ProductsPage() {
  const products = await getProducts()

  const formattedProducts = products.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    formattedTargetAmount: formatCurrency(product.targetAmount),
    formattedCurrentAmount: formatCurrency(product.currentAmount),
    formattedUnitAmount: formatCurrency(product.unitAmount),
    progress: Math.round((product.currentAmount / product.targetAmount) * 100),
  }))

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <DataTable columns={ProductColumns} data={formattedProducts} />
      </div>
    </div>
  )
}

