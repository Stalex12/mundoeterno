import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"

// 👇 1. VOLVEMOS A IMPORTAR CURSORLOADER
import { CursorLoader } from "@/components/cursor-loader" 
import "./globals.css"

const perandory = localFont({ src: "./fonts/Perandory.otf", variable: "--font-perandory", display: "swap" })
const amoresa = localFont({ src: "./fonts/Amoresa.ttf", variable: "--font-amoresa", display: "swap" })

export const metadata: Metadata = {
  title: "Florería - Regalos que Perduran",
  description: "Regalos florales que perduran en el tiempo.",
  icons: { icon: "/WhatsApp Image 2025-11-20 at 2.01.02 PM.jpeg" },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/WhatsApp Image 2025-11-20 at 2.01.02 PM.jpeg" sizes="any" />
      </head>
      <body 
        style={{ backgroundColor: "#faf9f7", color: "#1c1a38" }} 
        className={`${amoresa.variable} ${perandory.variable} antialiased`}
      >
        <AdminProvider>
          <CartProvider>
            {/* 👇 2. Usamos CursorLoader aquí */}
            <CursorLoader /> 
            {children}
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}