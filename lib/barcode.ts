import { createHash } from "crypto"
import JsBarcode from "jsbarcode"
import { createCanvas } from "canvas"

export async function generateInvestmentBarcode(userId: string, productId: string, units: number): Promise<string> {
  // Create a unique string based on user ID, product ID, units, and timestamp
  const timestamp = Date.now().toString()
  const dataString = `${userId}-${productId}-${units}-${timestamp}`

  // Generate a SHA-256 hash
  const hash = createHash("sha256").update(dataString).digest("hex")

  // Return the first 16 characters as the barcode
  return hash.substring(0, 16).toUpperCase()
}

export async function generateBarcodeBuffer(barcode: string): Promise<Buffer> {
  // Create a canvas to draw the barcode
  const canvas = createCanvas(300, 100)

  // Generate the barcode
  JsBarcode(canvas, barcode, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 80,
    displayValue: true,
    fontSize: 16,
    margin: 10,
  })

  // Convert canvas to PNG buffer
  return canvas.toBuffer("image/png")
}

