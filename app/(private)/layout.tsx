import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "Acmegrid Inc | Auth.",
  description: "Nigerian Commodity Investment Company",
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
