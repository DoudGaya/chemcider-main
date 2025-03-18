import { prisma } from "@/lib/prisma"

export const getLatestProducts = async (limit = 3) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return products || []
  } catch (error) {
    console.error("Error fetching latest products:", error)
    return []
  }
}

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    return product
  } catch {
    return null
  }
}

export const getAllProducts = async (status?: string) => {
  try {
    const products = await prisma.product.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    })

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const createProduct = async (
  title: string,
  description: string,
  targetAmount: number,
  unitAmount: number,
  cycle: number,
  returnPerCycle: number,
) => {
  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        targetAmount,
        unitAmount,
        cycle,
        returnPerCycle,
        status: "ACTIVE",
      },
    })

    return product
  } catch (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }
}

export const updateProduct = async (
  id: string,
  data: {
    title?: string
    description?: string
    targetAmount?: number
    unitAmount?: number
    cycle?: number
    returnPerCycle?: number
    status?: string
  },
) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    })

    return product
  } catch (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }
}

export const deleteProduct = async (id: string) => {
  try {
    // Check if product has investments
    const investmentsCount = await prisma.investment.count({
      where: { productId: id },
    })

    if (investmentsCount > 0) {
      throw new Error("Cannot delete product with active investments")
    }

    await prisma.product.delete({
      where: { id },
    })

    return true
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

