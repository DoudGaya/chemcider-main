import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Clear auth cookies
  const response = NextResponse.redirect(new URL("/", request.url))
  response.cookies.delete("next-auth.session-token")
  response.cookies.delete("next-auth.csrf-token")
  response.cookies.delete("next-auth.callback-url")

  return response
}

