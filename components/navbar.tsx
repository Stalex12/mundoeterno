"use client"

import Link from "next/link"
import Image from "next/image" // Import the Image component
import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Sobre Nosotros" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="Logo.png"
              alt="Florería Logo"
              width={70}
              height={40}
              className="rounded-full"
              style={{ objectFit: "contain" }}
            />
            <Image
              src="Nombre.png"
              alt="Florería Logo"
              width={200}
              height={400}
              className="rounded-full"
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#1c1a38" }}
                className="hover:opacity-70 transition-opacity font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 rounded-lg transition-colors"
              style={{ backgroundColor: "transparent" }}
            >
              <ShoppingCart size={24} style={{ color: "#1c1a38" }} />
              {items.length > 0 && (
                <span
                  style={{ backgroundColor: "#a0404f" }}
                  className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {items.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg transition-colors">
              {isOpen ? <X size={24} style={{ color: "#1c1a38" }} /> : <Menu size={24} style={{ color: "#1c1a38" }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{ borderColor: "#e8e6e1" }} className="md:hidden pb-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#1c1a38" }}
                className="block py-2 px-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
