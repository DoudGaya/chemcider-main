"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createProduct, updateProduct, deleteProduct } from "@/lib/products"

export async function createProductAction(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const targetAmount = Number.parseFloat(formData.get("targetAmount") as string)
    const unitAmount = Number.parseFloat(formData.get("unitAmount") as string)
    const cycle = Number.parseInt(formData.get("cycle") as string)
    const returnPerCycle = Number.parseFloat(formData.get("returnPerCycle") as string)

    if (!title || !description || isNaN(targetAmount) || isNaN(unitAmount) || isNaN(cycle) || isNaN(returnPerCycle)) {
      return { error: "Invalid form data" }
    }

    await createProduct(title, description, targetAmount, unitAmount, cycle, returnPerCycle)

    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: "Product created successfully" }
  } catch (error) {
    console.error("Create product error:", error)
    return { error: "Failed to create product" }
  }
}

export async function updateProductAction(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const targetAmount = Number.parseFloat(formData.get("targetAmount") as string)
    const unitAmount = Number.parseFloat(formData.get("unitAmount") as string)
    const cycle = Number.parseInt(formData.get("cycle") as string)
    const returnPerCycle = Number.parseFloat(formData.get("returnPerCycle") as string)
    const status = formData.get("status") as string

    if (!title || !description || isNaN(targetAmount) || isNaN(unitAmount) || isNaN(cycle) || isNaN(returnPerCycle)) {
      return { error: "Invalid form data" }
    }

    await updateProduct(id, {
      title,
      description,
      targetAmount,
      unitAmount,
      cycle,
      returnPerCycle,
      status,
    })

    revalidatePath("/admin/products")
    revalidatePath(`/admin/products/${id}`)
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)

    return { success: "Product updated successfully" }
  } catch (error) {
    console.error("Update product error:", error)
    return { error: "Failed to update product" }
  }
}

export async function deleteProductAction(id: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    await deleteProduct(id)

    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: "Product deleted successfully" }
  } catch (error: any) {
    console.error("Delete product error:", error)
    return { error: error.message || "Failed to delete product" }
  }
}

