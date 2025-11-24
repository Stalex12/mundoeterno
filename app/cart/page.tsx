"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useStoreConfig } from "@/hooks/use-store-config"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const { config } = useStoreConfig()

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      alert("Su carrito está vacío. Por favor, añada productos antes de contactar.")
      return
    }

    let message = "¡Hola! Me gustaría hacer un pedido con los siguientes productos:\n\n"
    items.forEach(item => {
      message += `- ${item.name} (x${item.quantity}) - Bs ${item.price.toLocaleString("es-BO", { minimumFractionDigits: 2 })} cada uno\n`
    })
    message += `\nTotal a pagar: Bs ${total.toLocaleString("es-BO", { minimumFractionDigits: 2 })}`
    message += `\n\nPor favor, confirme mi pedido.`

    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Continuar Comprando
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Mi Carrito
              </h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="text-gray-400" size={64} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Descubre nuestra hermosa colección de flores
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-serif rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-lg text-purple-600 font-semibold">
                          Bs {item.price.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-10 h-10 rounded-full bg-white shadow-sm hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                          >
                            <Minus size={16} className="text-purple-600" />
                          </button>

                          <span className="w-12 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full bg-white shadow-sm hover:bg-purple-50 transition-colors flex items-center justify-center"
                          >
                            <Plus size={16} className="text-purple-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-3 hover:bg-red-50 rounded-full transition-colors group"
                          title="Eliminar producto"
                        >
                          <Trash2 size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-xl font-bold text-gray-900">
                      Bs {(item.price * item.quantity).toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl font-serif transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>

            {/* Order Summary - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24 space-y-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Resumen del Pedido
                </h2>

                {/* Order Details */}
                <div className="space-y-3 py-6 border-y border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
                    <span className="font-semibold">
                      Bs {total.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    <span className="text-green-600 font-serif">A calcular</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900"><h2>Total:</h2></span>
                  <span className="text-3xl font-serif bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    BS {total.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* WhatsApp Checkout Button */}
                <button
                onClick={handleWhatsAppOrder}
                // 👇 Agregamos 'font-serif' aquí para que el texto cambie a Perandory
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl text-lg font-serif font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                >
                  {/* 👇 Quitamos 'font-serif' de aquí porque al ícono no le afecta */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Realizar Pedido vía WhatsApp
                </button>

                <h1 className="text-sm text-gray-500 text-center">
                  Será redirigido a WhatsApp para completar su pedido
                </h1>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Pago seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Entrega dentro de 24 horas</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Flores a su gusto garantizadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
