"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Search, Filter } from "lucide-react"

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

const categories = [
  { id: "all", label: "Todos", icon: "🌺" },
  { id: "rosas", label: "Rosas", icon: "🌹" },
  { id: "silvestres", label: "Silvestres", icon: "🌼" },
  { id: "girasoles", label: "Girasoles", icon: "🌻" },
  { id: "lirios", label: "Lirios", icon: "🌷" },
  { id: "tulipanes", label: "Tulipanes", icon: "🌷" },
  { id: "peonias", label: "Peonías", icon: "🌺" },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<PublicProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        setError(error.message)
        setProducts([])
      } else {
        setProducts(data as PublicProduct[])
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
              <h2>Nuestros Productos</h2>
            </span>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra flores y arreglos florales únicos
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={10} />
              <input
                type="text"
                placeholder="Buscar flores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Filter className="text-purple-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">Filtrar por categoría</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-400 hover:scale-105 hover:shadow-md"
                }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.label}</span>
              {selectedCategory === cat.id && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {filteredProducts.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <Spinner className="size-12 text-purple-600" />
            <p className="text-gray-500 text-lg">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <Alert variant="destructive" className="max-w-lg">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Error al cargar productos</AlertTitle>
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              {searchQuery
                ? `No hay resultados para "${searchQuery}"`
                : "No hay productos disponibles en esta categoría"}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-purple-600">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                  }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_urls[0] || "/placeholder.svg"}
                    description={product.description}
                    category={product.category}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

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
