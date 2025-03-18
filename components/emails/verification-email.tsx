import type React from "react"
import { BaseEmail } from "./base-email"

interface VerificationEmailProps {
  verificationLink: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({ verificationLink }) => {
  return (
    <BaseEmail previewText="Verify your email address">
      <h2 style={{ color: "#0ea5e9", marginBottom: "20px" }}>Verify your email address</h2>
      <p>Thank you for registering with Commodex. Please click the button below to verify your email address:</p>
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href={verificationLink}
          style={{
            display: "inline-block",
            backgroundColor: "#0ea5e9",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Verify Email
        </a>
      </div>
      <p>If you didn't request this email, please ignore it.</p>
      <p>This link will expire in 24 hours.</p>
    </BaseEmail>
  )
}

