import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chemcider Inc.",
  description: "Nigerian based chemical company, and Producer of the best quality products in the country.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
