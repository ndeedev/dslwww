import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "DSL",
    template: "%s | DSL"
  },
  description: 'DSL Sales Tools'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <header></header>        
        <main className="flex flex-col w-full min-h-screen">   
          <Navbar />
          <div className="flex-1 overflow-y-auto min-h-0 p-3 ">
            {children}
          </div>
          <Footer />
        </main>       
      </body>
    </html>
  );
}
