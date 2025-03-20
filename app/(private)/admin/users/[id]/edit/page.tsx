import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { UserForm } from "../../user-form"

interface UserEditPageProps {
  params: {
    id: string
  }
}

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    notFound()
  }

  return user
}

export default async function UserEditPage({ params }: UserEditPageProps) {
  const user = await getUser(params.id)

  return (
    <div className="container max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href={`/admin/users/${user.id}`}>
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
      </div>

      <UserForm user={user} />
    </div>
  )
}

