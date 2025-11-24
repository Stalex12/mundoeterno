"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { useStoreConfig } from "@/hooks/use-store-config"

// Componente manual para el icono de TikTok (estilo Lucide)
const TiktokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export function Footer() {
  const { config } = useStoreConfig()
  const currentYear = new Date().getFullYear()
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Lógica de WhatsApp ---
  const cleanPhone = config.phone ? config.phone.replace(/\D/g, "") : ""
  const message = encodeURIComponent("Hola, quisiera consultar el catálogo")
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`

  // --- Lógica de Email ---
  const mailtoUrl = `mailto:${config.email}`

  // --- Lógica de Google Maps (CORREGIDA) ---
  // 1. Si existe un enlace directo en config (googleMapsUrl), úsalo.
  // 2. Si no, genera una búsqueda con la dirección escrita.
  const mapUrl = config.googleMapsUrl 
    ? config.googleMapsUrl 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address || "Santa Cruz, Bolivia")}`

  // Si no está montado, no mostramos nada para evitar errores de hidratación
  if (!isMounted) {
    return (
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
             <div className="h-8 bg-slate-800 rounded w-1/4 mb-8"></div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
             </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-purple-300">
              {config.storeName || "Florería"}
            </h3>
            <p className="text-sm font-serif text-gray-300">Arreglos florales personalizados para cada ocasión especial.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300 font-serif">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 font-serif hover:text-purple-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 font-serif hover:text-purple-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 font-serif hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300 font-serif">
              Contacto
            </h4>
            <div className="space-y-3 text-sm">
              
              {/* TELÉFONO / WHATSAPP */}
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-purple-400" />
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  title="Enviar mensaje por WhatsApp"
                >
                  {config.phone}
                </a>
              </div>

              {/* DIRECCIÓN (GOOGLE MAPS) */}
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 font-serif hover:text-purple-400 transition-colors text-left"
                  title="Ver ubicación en Google Maps"
                >
                  {config.address}
                </a>
              </div>

            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300 font-serif">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              
              {/* FACEBOOK */}
              {config.socialMedia?.facebook && (
                <Link
                  href={config.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
              
              {/* INSTAGRAM */}
              {config.socialMedia?.instagram && (
                <Link
                  href={config.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              
              {/* TIKTOK */}
              {config.socialMedia?.tiktok && (
                <Link
                  href={config.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <TiktokIcon size={24} />
                  <span className="sr-only">TikTok</span>
                </Link>
              )}

              {/* YOUTUBE */}
              {config.socialMedia?.youtube && (
                <Link
                  href={config.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Youtube size={24} />
                  <span className="sr-only">YouTube</span>
                </Link>
              )}

            </div>

            {/* Business Hours */}
            {/* Business Hours */}
            <div className="mt-6">
              {/* Título */}
              <h5 className="font-serif font-bold mb-3 text-lg text-purple-300 tracking-wide">
                Horario
              </h5>
              
              <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <p className="flex gap-2">
                  <span className="font-serif font-bold text-purple-200">Lun-Vie:</span>
                  {/* 👇 AQUÍ ESTÁ LA CLAVE: Envolvemos la hora en un span con font-serif */}
                  <span className="font-serif">{config.businessHours?.monday || "Cerrado"}</span>
                </p>
                
                <p className="flex gap-2">
                  <span className="font-serif font-bold text-purple-200">Sábado:</span>
                  <span className="font-serif">{config.businessHours?.saturday || "Cerrado"}</span>
                </p>
                
                <p className="flex gap-2">
                  <span className="font-serif font-bold text-purple-200">Domingo:</span>
                  <span className="font-serif">{config.businessHours?.sunday || "Cerrado"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {config.storeName || "Florería"}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-400 font-serif hover:text-purple-400 text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="text-gray-400 font-serif hover:text-purple-400 text-sm transition-colors">
              Terminos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}