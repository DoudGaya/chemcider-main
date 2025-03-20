import type { Metadata } from "next";
import DashboardHeader from "./_components/DashboardHeader";
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
            Hello 
          </div>
        <div className=" w-full flex-col">
          <DashboardHeader user={user} />
          {children}
        </div>
        </div>
  );
}
