import { Suspense } from "react" // 1. Importa Suspense de React
import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"
// Tu componente de cursor (el que estés usando)
import { CursorLoader } from "@/components/cursor-loader" 
// O import { CustomCursor } from "@/components/custom-cursor"
import "./globals.css"

// ... (configuración de fuentes y metadata igual) ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* ... */}
      </head>
      <body className="...">
        
        <AdminProvider>
          <CartProvider>
            
            {/* 👇 SOLUCIÓN: Envuelve el cursor en Suspense */}
            <Suspense fallback={null}>
               <CursorLoader /> 
               {/* O <CustomCursor /> si usas ese */}
            </Suspense>
            
            {children}
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
