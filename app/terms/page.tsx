"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useStoreConfig } from "@/hooks/use-store-config"

export default function Terms() {
  const { config } = useStoreConfig()
  
  const storeName = config.storeName || "Mundo Eterno"
  const email = config.email || "info@mundoeterno.com"
  const phone = config.phone || "+591 695 07260"

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--azul-profundo)] mb-12">
          Términos y Condiciones
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          
          {/* 1. Aceptación */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">1. Aceptación de los Términos</h2>
            <p>
              Bienvenido a <strong>{storeName}</strong>. Al acceder a nuestro sitio web y realizar un pedido, 
              aceptas estar sujeto a los siguientes términos. Te recomendamos leerlos cuidadosamente.
            </p>
          </div>

          {/* 2. Productos (ACTUALIZADO: Naturales vs Artificiales) */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">2. Especificaciones de Productos</h2>
            <p>En nuestra tienda manejamos dos líneas de productos con características distintas:</p>
            
            <div className="ml-5 mt-4 space-y-4">
              <div>
                <h3 className="font-bold text-gray-900">A. Flores Naturales</h3>
                <p className="text-sm">
                  Son productos perecederos y estacionales. En caso de que una flor o base no esté disponible, 
                  nuestros floristas la sustituirán por una de igual o mayor valor, manteniendo el estilo del diseño original.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900">B. Flores Eternas (Artificiales Hechas a Mano)</h3>
                <p className="text-sm">
                  Estos arreglos son piezas artesanales creadas manualmente (cinta, tela, papel u otros materiales). 
                  Al ser <strong>100% hechas a mano</strong>, pueden existir ligeras variaciones en tamaño, forma o tonalidad 
                  entre una pieza y la foto de referencia. Estas variaciones no se consideran defectos, sino características 
                  que garantizan la exclusividad y elaboración manual de su pedido.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Precios */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">3. Precios y Pagos</h2>
            <p>
              Todos los precios están expresados en Bolivianos (BOB). Para pedidos personalizados (especialmente en flores eternas 
              con colores o diseños específicos), se requiere el pago o un anticipo del 50% para iniciar la elaboración del producto.
            </p>
          </div>

          {/* 4. Envíos */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">4. Envíos y Entregas</h2>
            <p>
              Es responsabilidad del cliente proporcionar una dirección exacta. Si la dirección es incorrecta o no hay quien reciba, 
              el reenvío tendrá un costo adicional.
            </p>
            <p className="mt-2 text-sm italic">
              * Para flores eternas enviadas por paquetería a otras ciudades, garantizamos un embalaje seguro, 
              pero no nos hacemos responsables por retrasos externos de la empresa de transporte.
            </p>
          </div>

          {/* 5. Políticas de Reclamo (ACTUALIZADO) */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">5. Cambios y Devoluciones</h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong>Flores Naturales:</strong> Cualquier reclamo sobre el estado de las flores debe realizarse dentro de las 
                <strong> 24 horas</strong> siguientes a la entrega, enviando foto al WhatsApp.
              </li>
              <li>
                <strong>Flores Eternas/Artificiales:</strong> No aceptamos devoluciones por "cambio de opinión" una vez entregado el producto, 
                ya que son piezas artesanales que requieren tiempo de elaboración. Solo se aceptarán cambios si el producto 
                presenta fallas estructurales evidentes al momento de la recepción.
              </li>
            </ul>
          </div>

          {/* 6. Cuidados */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--rosa)] mb-3">6. Recomendaciones de Cuidado</h2>
            <p>
              Para garantizar la durabilidad de tus productos:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
               <li><strong>Naturales:</strong> Mantener en lugar fresco, cambiar el agua día por medio y cortar tallos.</li>
               <li><strong>Eternas:</strong> No exponer al sol directo por periodos prolongados (para evitar decoloración) y limpiar el polvo suavemente. No mojar.</li>
            </ul>
          </div>

          {/* Caja de Contacto */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-10">
            <h3 className="font-serif text-xl font-bold text-[var(--azul-profundo)] mb-4">Atención al Cliente</h3>
            <p className="text-gray-600 mb-4">
              Si tienes dudas sobre tu pedido personalizado o los materiales que utilizamos, contáctanos:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-gray-700">
                📧 {email}
              </span>
              <span className="flex items-center gap-2 text-gray-700">
                📱 {phone}
              </span>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}