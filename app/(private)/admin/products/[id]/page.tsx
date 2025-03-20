import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductForm } from "../product-form"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  if (id === "new") {
    return null
  }

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return product
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  const isNew = params.id === "new"

  return (
    <div className="container max-w-4xl">
      <h1 className="text-2xl font-bold tracking-tight mb-6">{isNew ? "Add New Product" : "Edit Product"}</h1>
      <ProductForm product={product} />
    </div>
  )
}

