"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, Award, Users, Sparkles } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-block">
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Más que una florería, somos creadores de momentos inolvidables
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Image */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/floreria-tienda-interior-elegante.jpg"
              alt="Nuestra tienda"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl">
                <p className="text-gray-900 font-serif text-xl font-bold">
                  "Cada flor cuenta una historia"
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-serif">
              <p>
                Fundada en <span className="font-serif text-purple-600"> 2024 </span>Mundo Eterno es un emprendimiento creado por Kelly Cartagena Miranda el 27 de octubre de 2024, surge después de que descubriera en internet publicaciones de arreglos florales y elementos decorativos en material aterciopelado. Fascinada por estas creaciones, decidió realizar arañas con dulces para Halloween en la Plazuela Mariscal Antonio José de Sucre, debido al éxito de la venta, decide lanzar su propio negocio de todo tipo de flores a elección del cliente.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-4xl font-bold text-purple-600 mb-1">1</p>
                <p className="text-sm font-serif text-gray-600">Año de experiencia</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <p className="text-4xl font-bold text-pink-600 mb-1">1k+</p>
                <p className="text-sm font-serif text-gray-600">Clientes felices</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-4xl font-bold text-purple-600 mb-1">100+</p>
                <p className="text-sm font-serif text-gray-600">Diseños únicos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Pasión
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Amamos lo que hacemos y se refleja en cada arreglo que creamos con dedicación y cariño.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Excelencia
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nos esforzamos por superar las expectativas con los arreglos para lograr una alta calidad.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Compromiso
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tu satisfacción es nuestra prioridad. Estamos aquí para hacer realidad tus sueños florales.
              </p>
            </div>

            {/* Value 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Creatividad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tratamos que cada diseño se ajuste al cliente para si sea único y personalizado, reflejando un estilo y la ocasión especial.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-700 p-10 rounded-3xl shadow-xl text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Nuestra Misión
              </h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                Brindar arreglos florales elegantes y duraderos elaborados con distintos materiales de alta calidad, ofreciendo a nuestros clientes detalles significativos que transmitan amor, belleza y permanencia, buscamos crear experiencias memorables a través de productos cuidadosamente diseñados, con un servicio personalizado y comprometido.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 to-pink-700 p-10 rounded-3xl shadow-xl text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Nuestra Visión
              </h3>
              <p className="text-pink-100 text-lg leading-relaxed">
                Consolidarnos a nivel local como una marca referente en arreglos florales, reconocida por su elegancia, creatividad e innovación, expandiendo nuestra presencia mediante diseños exclusivos que convierten cada obsequio en un momento que perdura para siempre.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
