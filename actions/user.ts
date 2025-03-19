"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function updateUser(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as "USER" | "ADMIN"
    const isTwoFactorEnabled = formData.get("isTwoFactorEnabled") === "true"
    const emailVerified = formData.get("emailVerified") === "true"

    // Check if email is already in use by another user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser && existingUser.id !== id) {
      return { error: "Email already in use" }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name || null,
        email,
        role,
        isTwoFactorEnabled,
        emailVerified: emailVerified ? new Date() : null,
      },
    })

    revalidatePath(`/admin/users/${id}`)
    revalidatePath("/admin/users")

    return { success: "User updated successfully" }
  } catch (error) {
    console.error("Update user error:", error)
    return { error: "Failed to update user" }
  }
}

export async function updateUserSettings(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const isTwoFactorEnabled = formData.get("isTwoFactorEnabled") === "true"

    // Check if email is already in use by another user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser && existingUser.id !== session.user.id) {
      return { error: "Email already in use" }
    }

    const data: any = {
      name: name || null,
      email,
    }

    // Only include isTwoFactorEnabled if it was in the form data
    if (formData.has("isTwoFactorEnabled")) {
      data.isTwoFactorEnabled = isTwoFactorEnabled
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data,
    })

    revalidatePath("/settings")
    revalidatePath("/dashboard")

    return { success: "Settings updated successfully" }
  } catch (error) {
    console.error("Update user settings error:", error)
    return { error: "Failed to update settings" }
  }
}

