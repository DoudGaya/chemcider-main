import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "Acmegrid Inc | Auth.",
  description: "Nigerian based chemical company, and Producer of the best quality products in the country.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <div className="">
            {children}
            <Toaster />
        </div>
  );
}
