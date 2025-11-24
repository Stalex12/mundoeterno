"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, FileText, Settings, LogOut } from "lucide-react"

const menuItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Productos" },
  { href: "/admin/blog", icon: FileText, label: "Blog" },
  { href: "/admin/settings", icon: Settings, label: "Configuración" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 text-white h-screen fixed left-0 top-0 flex flex-col" style={{ backgroundColor: "#1c1a38" }}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold"
            style={{ backgroundColor: "#a0404f" }}
          >
            F
          </div>
          <span className="font-serif text-lg font-bold">Admin</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors`}
              style={isActive ? { backgroundColor: "#a0404f", color: "white" } : { color: "#d0d0d0" }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          style={{ color: "#d0d0d0" }}
        >
          <LogOut size={20} />
          <span>Volver a Tienda</span>
        </Link>
      </div>
    </div>
  )
}
