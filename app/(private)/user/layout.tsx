import type { Metadata } from "next";
// import DashboardHeader from "./_components/DashboardHeader";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import { getUserById } from "@/lib/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Acmegrid Inc.",
  description: "Nigerian based chemical company, and Producer of the best quality products in the country.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions)
  
    if (!session || !session.user.id) {
      redirect("/login")
    }

    const user = await getUserById(session.user.id);
  return (

        <div className=" flex ">
          <div className=" w-[300px] hidden md:flex h-screen">
             
          </div>
        <div className=" w-full flex-col">
          <DashboardHeader user={user} />
          {children}
        </div>
        </div>
  );
}


// import type React from "react"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { redirect } from "next/navigation"
// import Link from "next/link"
// import { DollarSign, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     redirect("/login")
//   }

//   return (
//     <div className=" bg-gray-50">
//       <main className="">{children}</main>
//     </div>
//   )
// }

