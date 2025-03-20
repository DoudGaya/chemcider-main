import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PublicNavigation from "@/components/PublicNavigation";



export const metadata: Metadata = {
  title: "Acmegrid Inc | Auth.",
  description: "Nigerian Commodity Investment Company",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  const session = await getServerSession(authOptions)

  return (
        <div className="">
                  <PublicNavigation session={session} />
            {children}
            <Toaster />
        </div>
  );
}
