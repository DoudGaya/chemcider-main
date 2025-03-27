import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import PublicNavigation from "@/components/PublicNavigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Acmegrid Inc | Auth.",
  description: "Nigerian based chemical company, and Producer of the best quality products in the country.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)


  if (session) {
    redirect("/dashboard")
  }

  return (
        <div className="">
          {/* <PublicNavigation /> */}
            {children}
            <Toaster />
        </div>
  );
}
