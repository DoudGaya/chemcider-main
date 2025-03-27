import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Acmegrid Inc.",
  description: "Nigerian commodity Investment Company.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getServerSession(authOptions)

  // // Check if we're on the homepage and user is logged in
  // const isHomePage = typeof window !== "undefined" ? window.location.pathname === "/" : false

  // if (session && isHomePage) {
  //   // Redirect based on user role
  //   if (session.user.role === "ADMIN") {
  //     redirect("/admin")
  //   } else {
  //     redirect("/dashboard")
  //   }
  // }

  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
       <div className="">
        {children}
       </div>
      </body>
    </html>
  );
}
