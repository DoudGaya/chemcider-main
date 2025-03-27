import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // If not authenticated, redirect to login
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard")
  }

  // Check if user is accessing the correct section based on their role
  // @ts-ignore
  const { pathname } = new URL(headers().get("x-url") || "http://localhost:3000")

  // If admin is trying to access user routes
  if (session.user.role === UserRole.USER && pathname.startsWith("/dashboard") && !pathname.startsWith("/admin")) {
    redirect("/admin/dashboard")
  }

  // If regular user is trying to access admin routes
  if (session.user.role === UserRole.ADMIN && pathname.startsWith("/admin")) {
    redirect("/dashboard")
  }

  return <>{children}</>
}



// import type { Metadata } from "next";
// import { Toaster } from "@/components/ui/sonner"
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { UserRole } from "@prisma/client";
// import { redirect } from "next/navigation";




// export const metadata: Metadata = {
//   title: "Acmegrid Inc | Auth.",
//   description: "Nigerian Commodity Investment Company",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   const session = await getServerSession(authOptions)

//   // Check if we're on the homepage and user is logged in
//   // const isHomePage = typeof window !== "undefined" ? window.location.pathname === "/" : false

//   // if (session) {
//   //   // Redirect based on user role
//   //   if (session.user.role === "ADMIN") {
//   //     redirect("/admin/dashboard")
//   //   } else {
//   //     redirect("/dashboard")
//   //   }
//   // }


//   return (
//         <div className="">
//             {children}
//             <Toaster />
//         </div>
//   );
// }
