"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductCard } from "@/components/product-card"
import { Package, Truck, Shield, ArrowLeft } from "lucide-react"

// Define the product interface based on Supabase schema
interface PublicProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image_urls: string[];
  category: string;
  stock: number;
  featured: boolean;
  created_at?: string;
}

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<PublicProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState<string>("")
  const [suggestedProducts, setSuggestedProducts] = useState<PublicProduct[]>([])

  useEffect(() => {
    const fetchProductAndSuggested = async () => {
      setIsLoading(true)
      setError(null)

      // Fetch main product
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single()

      if (error) {
        setError(error.message)
        setProduct(null)
        setIsLoading(false)
        return
      }

      setProduct(data as PublicProduct)
      if (data?.image_urls && data.image_urls.length > 0) {
        setMainImage(data.image_urls[0])
      } else {
        setMainImage("/placeholder.svg")
      }

      // Fetch suggested products from the same category
      const { data: suggestedData, error: suggestedError } = await supabase
        .from("products")
        .select("*")
        .neq("id", productId)
        .eq("category", data.category)
        .limit(4)

      if (suggestedError) {
        console.error("Error fetching suggested products:", suggestedError.message)
        setSuggestedProducts([])
      } else {
        setSuggestedProducts(suggestedData as PublicProduct[])
      }

      setIsLoading(false)
    }

    if (productId) {
      fetchProductAndSuggested()
    }
  }, [productId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Spinner className="size-12 text-purple-600" />
          <p className="text-gray-500 text-lg">Cargando producto...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center p-8">
          <Alert variant="destructive" className="max-w-lg">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Error al cargar producto</AlertTitle>
            <AlertDescription className="text-base">{error || "Producto no encontrado."}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Destacado
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.image_urls && product.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.image_urls.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square cursor-pointer rounded-xl overflow-hidden border-3 transition-all duration-300 ${imgUrl === mainImage
                        ? "border-purple-600 shadow-lg shadow-purple-500/30 scale-105"
                        : "border-gray-200 hover:border-purple-400 hover:scale-105"
                      }`}
                    onClick={() => setMainImage(imgUrl)}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Vista ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price and Stock - CORREGIDO AGRESIVAMENTE */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              {/* Precio: Se añade mucho padding (py-4 px-2) para expandir la caja del gradiente 
                  y que no corte la fuente cursiva. Se compensa con margen negativo (-my-4).
              */}
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent py-4 px-2 -my-4 inline-block leading-relaxed">
                Bs {product.price.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
              </span>
              
              {/* Stock: Se quita 'font-bold' para que no se vea borroso. 
                  Se añade 'tracking-widest' (letras separadas) y 'uppercase' para nitidez.
              */}
              {product.stock > 0 ? (
                <span className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-xs font-serif tracking-widest border border-green-100 uppercase">
                  <Package size={14} />
                  En Stock ({product.stock})
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full text-xs font-serif tracking-widest border border-red-100 uppercase">
                  <Package size={14} />
                  Agotado
                </span>
              )}
            </div>

            {/* Description */}
            {product.description ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 italic">No hay descripción disponible para este producto.</p>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4">
              <AddToCartButton
                id={product.id}
                name={product.name}
                price={product.price}
                image={mainImage}
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Truck className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Entrega Rápida</h4>
                  <p className="text-sm text-gray-600">Entrega el mismo día en área metropolitana</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Calidad Garantizada</h4>
                  <p className="text-sm text-gray-600">Flores al gusto del cliente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <section className="py-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Productos Similares
              </h2>
              <p className="text-lg text-gray-600">
                Otras opciones que podrían interesarte
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedProducts.map((p, index) => (
                <div
                  key={p.id}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image_urls[0] || "/placeholder.svg"}
                    description={p.description}
                    category={p.category}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}