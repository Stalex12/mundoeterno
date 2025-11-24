"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function CursorLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 1. Activar el cursor de flor
    document.body.classList.add("page-loading")
    
    // 2. Esperar un momento para que se vea (simulando carga o transición)
    // Puedes ajustar el tiempo: 1000 = 1 segundo
    const timer = setTimeout(() => {
      document.body.classList.remove("page-loading")
    }, 1500)

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer)
  }, [pathname, searchParams]) // Se ejecuta cada vez que cambia la ruta (URL)

  return null // Este componente no renderiza nada visual, solo lógica
}