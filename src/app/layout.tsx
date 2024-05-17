import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Meu primeiro micro saas",
 description: "Criado por Walace Cordeiro",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html suppressHydrationWarning lang="pt-br">
   <body className={inter.className}>
    {children}
    <Toaster />
   </body>
  </html>
 );
}
