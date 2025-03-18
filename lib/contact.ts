import { prisma } from "@/lib/prisma"
import { sendContactNotificationEmail } from "@/lib/mail"

export const createContact = async (
  firstName: string,
  lastName: string,
  email: string,
  company: string | null,
  interest: string,
  message: string,
) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        company,
        interest,
        message,
      },
    })

    // Send notification email to admin
    await sendContactNotificationEmail({
      firstName,
      lastName,
      email,
      company,
      interest,
      message,
    })

    return contact
  } catch (error) {
    console.error("Error creating contact:", error)
    throw new Error("Failed to submit contact form")
  }
}

export const getContacts = async (isRead?: boolean) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: isRead !== undefined ? { isRead } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    })

    return contacts
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return []
  }
}

export const markContactAsRead = async (id: string) => {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { isRead: true },
    })

    return contact
  } catch (error) {
    console.error("Error marking contact as read:", error)
    throw new Error("Failed to update contact")
  }
}

