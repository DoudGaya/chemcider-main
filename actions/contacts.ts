"use server"

import { revalidatePath } from "next/cache"
import { createContact, markContactAsRead } from "@/lib/contact"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function submitContactForm(formData: FormData): Promise<{ success?: string; error?: string }> {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const interest = formData.get("interest") as string
    const message = formData.get("message") as string

    if (!firstName || !lastName || !email || !interest || !message) {
      return { error: "All required fields must be filled" }
    }

    await createContact(firstName, lastName, email, company || null, interest, message)

    return { success: "Your message has been sent successfully" }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { error: "Failed to submit form. Please try again later." }
  }
}

export async function markContactReadAction(id: string): Promise<{ success?: string; error?: string }> {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    await markContactAsRead(id)

    revalidatePath("/admin/contacts")

    return { success: "Contact marked as read" }
  } catch (error) {
    console.error("Mark contact as read error:", error)
    return { error: "Failed to update contact" }
  }
}



// "use server"

// import { revalidatePath } from "next/cache"
// import { createContact, markContactAsRead } from "@/lib/contact"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export async function submitContactForm(formData: FormData) {
//   try {
//     const firstName = formData.get("firstName") as string
//     const lastName = formData.get("lastName") as string
//     const email = formData.get("email") as string
//     const company = formData.get("company") as string
//     const interest = formData.get("interest") as string
//     const message = formData.get("message") as string

//     if (!firstName || !lastName || !email || !interest || !message) {
//       return { error: "All required fields must be filled" }
//     }

//     await createContact(firstName, lastName, email, company || null, interest, message)

//     return { success: "Your message has been sent successfully" }
//   } catch (error) {
//     console.error("Contact form submission error:", error)
//     return { error: "Failed to submit form. Please try again later." }
//   }
// }

// export async function markContactReadAction(id: string) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session || session.user.role !== "ADMIN") {
//       return { error: "Unauthorized" }
//     }

//     await markContactAsRead(id)

//     revalidatePath("/admin/contacts")

//     return { success: "Contact marked as read" }
//   } catch (error) {
//     console.error("Mark contact as read error:", error)
//     return { error: "Failed to update contact" }
//   }
// }

