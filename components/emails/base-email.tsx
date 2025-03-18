import type React from "react"

interface BaseEmailProps {
  previewText?: string
  children: React.ReactNode
}

export const BaseEmail: React.FC<BaseEmailProps> = ({ previewText = "Email from Commodex", children }) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{previewText}</title>
      </head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
          backgroundColor: "#f9fafb",
          color: "#111827",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
          <div
            style={{
              marginTop: "30px",
              padding: "20px 0",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            <p>&copy; {new Date().getFullYear()} Commodex. All rights reserved.</p>
            <p>15 Financial District, Lagos Business Hub, Lagos, Nigeria</p>
          </div>
        </div>
      </body>
    </html>
  )
}

