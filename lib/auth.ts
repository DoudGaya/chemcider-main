import { PrismaAdapter } from "@auth/prisma-adapter"
import type { UserRole } from "@prisma/client"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor"
import { getUserById } from "@/lib/user"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "Two-Factor Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          return null
        }

        // Check if 2FA is enabled
        if (user.isTwoFactorEnabled) {
          if (!credentials.code) {
            throw new Error("2FA_REQUIRED")
          }

          // Verify the 2FA code
          const twoFactorVerification = await prisma.verification.findFirst({
            where: {
              userId: user.id,
              type: "TWO_FACTOR",
              token: credentials.code,
              expires: { gt: new Date() },
            },
          })

          if (!twoFactorVerification) {
            throw new Error("Invalid 2FA code")
          }

          // Delete the used verification
          await prisma.verification.delete({
            where: { id: twoFactorVerification.id },
          })

          // Create a 2FA confirmation
          await prisma.twoFactorConfirmation.upsert({
            where: { userId: user.id },
            update: { createdAt: new Date() },
            create: { userId: user.id },
          })
        }

        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true

      // Prevent sign in without email verification
      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      // 2FA Check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false
      }

      return true
    },
    async jwt({ token, user }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const userWallet = await prisma.wallet.findUnique({
        where: { userId: existingUser.id },
      })

      token.role = existingUser.role
      token.name = existingUser.name
      token.email = existingUser.email
      token.emailVerified = existingUser.emailVerified
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.walletBalance = userWallet?.balance || 0
      token.referralCode = existingUser.referralCode

      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole
        session.user.emailVerified = token.emailVerified as Date | null
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.walletBalance = token.walletBalance as number
        session.user.referralCode = token.referralCode as string
      }
      return session
    },
  },
  events: {
    async linkAccount({ user }) {
      // When OAuth account is linked, mark email as verified
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
}

