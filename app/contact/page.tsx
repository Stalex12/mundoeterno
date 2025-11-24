"use cliente"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[var(--granate)] to-[var(--rosa)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Contacto</h1>
          <p className="text-xl">Nos encantaría saber de ti</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-[var(--azul-profundo)] mb-8">Información de Contacto</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--rosa)] text-white">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[var(--azul-profundo)]">Teléfono</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Lun - Vie: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--verde)] text-white">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[var(--azul-profundo)]">Email</h3>
                  <p className="text-gray-600">info@floreria.com</p>
                  <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--celeste)] text-white">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[var(--azul-profundo)]">Ubicación</h3>
                  <p className="text-gray-600">Calle Principal 123</p>
                  <p className="text-gray-600">Ciudad, Estado 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-[var(--gris-claro)]">
            <h2 className="text-2xl font-serif font-bold text-[var(--azul-profundo)] mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="Asunto del mensaje"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="Tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
