import Link from 'next/link'
export function HeroSection() {
  const videoSrc = '/Video_de_Fondo_para_Florería.mp4'

  return (
    <section className="relative w-full h-96 md:h-screen flex items-center justify-center overflow-hidden">
      <video
        src={videoSrc}
        loop
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      ></video>
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay for text contrast */}

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          Regalos que Perduran
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          Arreglos florales elegantes para cada momento especial de tu vida
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="btn-primary px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform bg-purple-600 hover:bg-purple-700 text-white"
          >
            Ver Productos
          </Link>
          <Link
            href="/about"
            className="text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:opacity-90 bg-blue-600 hover:bg-blue-700"
          >
            Conocer Más
          </Link>
        </div>
      </div>
    </section>
  )
}
