"use client"

import Image from "next/image"
import Link from "next/link" // Import Link
import { AddToCartButton } from "./add-to-cart-button"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string // Added category prop
}

export function ProductCard({ id, name, price, image, description, category }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} passHref> {/* Wrap the card in a Link */}
      <div className="card-flower overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-48 overflow-hidden" style={{ backgroundColor: "#e8e6e1" }}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading="eager" // Add loading="eager" for LCP optimization
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2" style={{ color: "#1c1a38" }}>
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold" style={{ color: "#a0404f" }}>
              Bs {price.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
            </span>
            <AddToCartButton id={id} name={name} price={price} image={image} />
          </div>
        </div>
      </div>
    </Link>
  )
}
