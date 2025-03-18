import type { UserRole } from "@prisma/client"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string
      role: UserRole
      emailVerified: Date | null
      isTwoFactorEnabled: boolean
      walletBalance: number
      referralCode: string
    } & DefaultSession["user"]
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string
    role: UserRole
    emailVerified: Date | null
    isTwoFactorEnabled: boolean
    referralCode: string
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string
    role: UserRole
    emailVerified: Date | null
    isTwoFactorEnabled: boolean
    walletBalance: number
    referralCode: string
  }
}

