"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { generateInvestmentCertificate } from "./actions"
import { toast } from "@/components/ui/use-toast"
import type { Investment, Product, User } from "@prisma/client"

interface GenerateCertificateButtonProps {
  investment: Investment & { product: Product }
  user: User
}

export function GenerateCertificateButton({ investment, user }: GenerateCertificateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)

    try {
      const result = await generateInvestmentCertificate({
        investmentId: investment.id,
        userId: user.id,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      // Create a download link for the PDF
      const blob = new Blob([result.pdf], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `investment-certificate-${investment.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Certificate Generated",
        description: "Your investment certificate has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      className="w-full bg-gradient-to-r from-blue-600 to-violet-600"
      onClick={handleGenerateCertificate}
      disabled={isGenerating}
    >
      <FileDown className="mr-2 h-4 w-4" />
      {isGenerating ? "Generating..." : "Generate Certificate"}
    </Button>
  )
}

