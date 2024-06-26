import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./_components/theme-provider";

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
     {children}
    </ThemeProvider>
    <Toaster />
   </body>
  </html>
 );
}
