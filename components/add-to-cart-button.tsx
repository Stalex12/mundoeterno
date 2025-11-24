"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context" // Re-import useCart

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function AddToCartButton({ id, name, price, image }: AddToCartButtonProps) {
  const { addItem } = useCart(); // Use the cart context

  const handleAddToCart = () => {
    addItem({ id, name, price, image, quantity: 1 }); // Add item with quantity 1
  };

  return (
    <button onClick={handleAddToCart} className="btn-primary p-2 rounded-lg hover:scale-105 transition-transform">
      <ShoppingCart size={20} />
    </button>
  )
}
