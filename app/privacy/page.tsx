"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useStoreConfig } from "@/hooks/use-store-config"

export default function Privacy() {
  const { config } = useStoreConfig()
  
  // Usamos valores por defecto por si tarda en cargar la config
  const storeName = config.storeName || "Mundo Eterno"
  const email = config.email || "info@mundoeterno.com"

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif font-bold text-[var(--azul-profundo)] mb-12">Política de Privacidad</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          
          {/* 1. Introducción */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">1. Introducción</h2>
            <p>
              En <strong>{storeName}</strong>, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
              Esta política de privacidad explica de manera transparente cómo recopilamos, utilizamos y protegemos tu información.
            </p>
          </div>

          {/* 2. Información que Recopilamos */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">2. Información que Recopilamos</h2>
            <p>
              Recopilamos únicamente la información necesaria que nos proporcionas voluntariamente para gestionar tus pedidos, 
              como tu nombre completo, número de celular (para coordinación por WhatsApp) y la dirección de entrega 
              cuando solicitas un envío a domicilio.
            </p>
          </div>

          {/* 3. Uso de Información */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">3. Uso de Información</h2>
            <p>
              Utilizamos tu información exclusivamente para procesar tus pedidos, coordinar la entrega de los arreglos florales, 
              enviar confirmaciones de compra y responder a tus consultas.
            </p>
          </div>

          {/* 4. Protección de Datos (CORREGIDO) */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">4. Protección de Datos</h2>
            <p>
              Nos comprometemos a que ningún dato será utilizado con fines distintos a los del servicio contratado. 
              Implementamos medidas de seguridad para proteger tu información personal contra el acceso, divulgación 
              o destrucción no autorizada. No vendemos ni compartimos tus datos con terceros.
            </p>
          </div>

          {/* 5. Cookies */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">5. Cookies</h2>
            <p>
              Nuestro sitio puede utilizar cookies básicas para mejorar tu experiencia de navegación (por ejemplo, recordar tus preferencias). 
              Puedes controlar el uso de cookies a través de la configuración de tu navegador.
            </p>
          </div>

          {/* 6. Derechos del Usuario (CORREGIDO) */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">6. Derechos del Usuario</h2>
            <p>
              Tienes derecho a solicitar acceso a cualquier dato tuyo (nombre, dirección, teléfono o historial de compras) 
              que hayamos registrado durante nuestra comunicación. Para ejercer estos derechos o solicitar la eliminación 
              de tus datos, contáctanos directamente a nuestro correo o WhatsApp.
            </p>
          </div>

          {/* 7. Cambios en esta Política */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">7. Cambios en esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento para reflejar cambios 
              en nuestros servicios o regulaciones legales.
            </p>
          </div>

          {/* Caja de contacto final */}
          <div className="bg-[var(--gris-claro)] p-6 rounded-lg mt-8 border border-gray-200">
            <p className="text-sm text-gray-600">
              Última actualización: Noviembre 2025. <br />
              Si tienes preguntas sobre esta política, contáctanos en: 
              <a href={`mailto:${email}`} className="text-[var(--azul-profundo)] font-semibold hover:underline ml-1">
                {email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}