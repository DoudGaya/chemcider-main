import type { Metadata } from "next";
// import DashboardHeader from "./_components/DashboardHeader";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import { getUserById } from "@/lib/user";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import logo from '@/public/logo.png'

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

        <div className=" flex bg-amber-100">
          <div className=" w-[250px] left-0 top-0 py-2 px-4 border-r flex-col hidden md:flex h-full min-h-screen bg-white">
              <div className=" border-b pb-4 fixed top-0 left-0 w-full max-w-[250px] py-2 mb-4 flex items-center justify-between">
                <div className=" px-6">
                <Image src={logo} alt="logo" width={40} className=' object-left h-10 object-contain w-full' height={40} />
                </div>
              </div> 
              <div className="">
                </div> 
              <div className=""></div> 
          </div>
        <div className=" w-full flex-col">
          <DashboardHeader user={user} />
         <div className=" p-6 overflow-scroll">
         {children}
         </div>
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

