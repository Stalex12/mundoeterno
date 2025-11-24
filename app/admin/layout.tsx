import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Florería",
  description: "Panel de administración de la florería",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
