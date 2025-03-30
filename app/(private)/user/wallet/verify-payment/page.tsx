"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { verifyFundingPayment } from "../actions"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function VerifyPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")

  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) {
      setIsVerifying(false)
      setError("Missing payment reference")
      return
    }

    const verifyPayment = async () => {
      try {
        const result = await verifyFundingPayment({ reference })

        if (result.error) {
          setError(result.error)
          toast({
            title: "Payment verification failed",
            description: result.error,
            variant: "destructive",
          })
        } else {
          setIsSuccess(true)
          toast({
            title: "Payment successful",
            description: "Your wallet has been funded successfully.",
          })
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred")
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [reference])

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isVerifying ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          ) : isSuccess ? (
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          ) : (
            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          )}
          <CardTitle className="mt-4">
            {isVerifying ? "Verifying Payment" : isSuccess ? "Payment Successful" : "Payment Failed"}
          </CardTitle>
          <CardDescription>
            {isVerifying
              ? "Please wait while we verify your payment..."
              : isSuccess
                ? "Your wallet has been funded successfully."
                : `Payment verification failed: ${error}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {!isVerifying && (
            <p className="text-sm text-muted-foreground">
              {isSuccess
                ? "You can now use your funds to invest in opportunities."
                : "Please try again or contact support if the issue persists."}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isVerifying && (
            <Button
              onClick={() => router.push("/dashboard/wallet")}
              className={isSuccess ? "bg-gradient-to-r from-blue-600 to-violet-600" : ""}
            >
              {isSuccess ? "Go to Wallet" : "Back to Wallet"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

