"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // ⚙️ CONFIGURACIÓN: AJUSTA ESTO SI NO SE SIENTE EXACTO
  const CURSOR_SIZE = 80; // Tamaño del video en píxeles
  const OFFSET = CURSOR_SIZE / 2; // Esto centra el video (40px). 
  // Si quieres que la punta sea la esquina superior izquierda, pon OFFSET = 0

  // Lógica de Carga (Loading)
  useEffect(() => {
    const startLoading = () => {
      setIsVisible(true)
      document.body.classList.add("is-loading-cursor")

      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.classList.remove("is-loading-cursor")
      }, 2500) // Duración de 2.5 segundos

      return timer
    }

    const timerId = startLoading()

    return () => {
      clearTimeout(timerId)
      document.body.classList.remove("is-loading-cursor")
    }
  }, [pathname, searchParams])

  // Lógica de Movimiento (Optimizado para precisión)
  useEffect(() => {
    if (!isVisible) return

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Restamos el OFFSET para que el centro del video esté en la punta del mouse
        const x = e.clientX - OFFSET
        const y = e.clientY - OFFSET
        
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [isVisible, OFFSET])

  if (!isVisible) return null

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      // 'pointer-events-none' es CRUCIAL para poder hacer clic a través del video
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ 
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        // Esto asegura que el movimiento sea instantáneo y no se sienta "lag"
        willChange: 'transform',
      }}
    >
      <video
        src="/Cursor.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        // 'object-contain' evita que el video se recorte mal
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  )
}