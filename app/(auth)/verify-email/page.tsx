"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail } from "@/actions/auth"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      setError("Missing verification token")
      return
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token)

        if (result.error) {
          setError(result.error)
        } else {
          setIsSuccess(true)
        }
      } catch (error) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            {isLoading ? (
              <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            ) : isSuccess ? (
              <CheckCircle className="h-10 w-10 text-green-500" />
            ) : (
              <XCircle className="h-10 w-10 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl text-center">
            {isLoading ? "Verifying your email" : isSuccess ? "Email verified" : "Verification failed"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLoading
              ? "Please wait while we verify your email address..."
              : isSuccess
                ? "Your email has been successfully verified."
                : `We couldn't verify your email: ${error}`}
          </CardDescription>
        </CardHeader>
        {!isLoading && (
          <>
            <CardContent className="text-center">
              {isSuccess ? (
                <p className="text-sm text-muted-foreground">You can now sign in to your account.</p>
              ) : (
                <p className="text-sm text-muted-foreground">The verification link may have expired or is invalid.</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-gradient-to-r from-teal-500 to-blue-600">
                <Link href="/login">{isSuccess ? "Sign in" : "Try again"}</Link>
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

