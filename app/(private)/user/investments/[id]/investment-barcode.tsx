"use client"

import { useEffect, useRef } from "react"
import JsBarcode from "jsbarcode"

interface InvestmentBarcodeProps {
  barcode: string
}

export function InvestmentBarcode({ barcode }: InvestmentBarcodeProps) {
  const barcodeRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (barcodeRef.current && barcode) {
      JsBarcode(barcodeRef.current, barcode, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 16,
        margin: 10,
      })
    }
  }, [barcode])

  return (
    <div className="flex flex-col items-center justify-center">
      <svg ref={barcodeRef} className="w-full"></svg>
      <p className="text-sm text-muted-foreground mt-2">Scan this barcode to verify your investment</p>
    </div>
  )
}

