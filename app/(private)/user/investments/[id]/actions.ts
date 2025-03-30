"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { generateBarcodeBuffer } from "@/lib/barcode"

interface CertificateParams {
  investmentId: string
  userId: string
}

export async function generateInvestmentCertificate({ investmentId, userId }: CertificateParams) {
  try {
    // Get investment details
    const investment = await prisma.investment.findUnique({
      where: {
        id: investmentId,
        userId, // Ensure the investment belongs to the user
      },
      include: {
        product: true,
        user: true,
      },
    })

    if (!investment) {
      return { error: "Investment not found" }
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()

    // Add a page to the document
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size

    // Get fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Set up some variables for positioning
    const margin = 50
    const width = page.getWidth() - margin * 2
    let y = page.getHeight() - margin

    // Add title
    page.drawText("INVESTMENT CERTIFICATE", {
      x: margin,
      y,
      size: 24,
      font: helveticaBold,
      color: rgb(0, 0, 0.8),
    })

    y -= 40

    // Add certificate ID
    page.drawText(`Certificate ID: ${investment.id}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    y -= 40

    // Add company info
    page.drawText("Commodex Investment Platform", {
      x: margin,
      y,
      size: 16,
      font: helveticaBold,
      color: rgb(0, 0, 0.8),
    })

    y -= 20

    page.drawText("15 Financial District, Lagos Business Hub, Lagos, Nigeria", {
      x: margin,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    y -= 10

    page.drawText("info@commodex.com | www.commodex.com", {
      x: margin,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    y -= 40

    // Add separator line
    page.drawLine({
      start: { x: margin, y },
      end: { x: page.getWidth() - margin, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    })

    y -= 40

    // Add investor info
    page.drawText("INVESTOR INFORMATION", {
      x: margin,
      y,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0.8),
    })

    y -= 25

    page.drawText(`Name: ${investment.user.name || investment.user.email}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    page.drawText(`Email: ${investment.user.email}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    page.drawText(`Investor ID: ${investment.userId}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 40

    // Add investment info
    page.drawText("INVESTMENT DETAILS", {
      x: margin,
      y,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0.8),
    })

    y -= 25

    page.drawText(`Product: ${investment.product.title}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    page.drawText(`Investment Amount: ${formatCurrency(investment.amount)}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    page.drawText(`Units Purchased: ${investment.units}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    // Calculate expected return
    const expectedReturn =
      investment.amount * (1 + (investment.product.returnPerCycle / 100) * investment.product.cycle)

    page.drawText(`Expected Return: ${formatCurrency(expectedReturn)}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    // Calculate profit
    const profit = expectedReturn - investment.amount

    page.drawText(`Profit: ${formatCurrency(profit)}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    page.drawText(`Investment Date: ${new Date(investment.createdAt).toLocaleDateString()}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 20

    // Calculate maturity date
    const maturityDate = new Date(investment.createdAt)
    maturityDate.setMonth(maturityDate.getMonth() + investment.product.cycle)

    page.drawText(`Maturity Date: ${maturityDate.toLocaleDateString()}`, {
      x: margin,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    y -= 40

    // Add barcode
    // Generate barcode image
    const barcodeBuffer = await generateBarcodeBuffer(investment.barcode || "")
    const barcodeImage = await pdfDoc.embedPng(barcodeBuffer)

    const barcodeWidth = 200
    const barcodeHeight = 100
    const barcodeX = (page.getWidth() - barcodeWidth) / 2

    page.drawImage(barcodeImage, {
      x: barcodeX,
      y: y - barcodeHeight,
      width: barcodeWidth,
      height: barcodeHeight,
    })

    y -= barcodeHeight + 20

    page.drawText("Scan this barcode to verify your investment", {
      x: margin,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
      maxWidth: width,
      lineHeight: 12,
      textAlign: "center",
    })

    y -= 60

    // Add disclaimer
    page.drawText("DISCLAIMER", {
      x: margin,
      y,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0.8),
    })

    y -= 20

    const disclaimer =
      "This certificate is proof of your investment with Commodex. All investments are subject to market risks. Please read all scheme related documents carefully. Past performance is not indicative of future returns."

    page.drawText(disclaimer, {
      x: margin,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
      maxWidth: width,
      lineHeight: 12,
    })

    y -= 60

    // Add signature
    page.drawText("Authorized Signature", {
      x: page.getWidth() - margin - 150,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    y -= 40

    // Add date
    const currentDate = new Date().toLocaleDateString()
    page.drawText(`Date: ${currentDate}`, {
      x: margin,
      y,
      size: 10,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save()

    return { pdf: pdfBytes }
  } catch (error: any) {
    console.error("Certificate generation error:", error)
    return { error: error.message || "Failed to generate certificate" }
  }
}

