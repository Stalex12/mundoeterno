"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { BarChart3, Package, TrendingUp, Users } from "lucide-react"

export default function AdminDashboardContent() {
  const stats = [
    {
      title: "Productos",
      value: "24",
      icon: Package,
      color: "bg-[var(--rosa)]",
    },
    {
      title: "Ventas Este Mes",
      value: "$2,450",
      icon: TrendingUp,
      color: "bg-[var(--verde)]",
    },
    {
      title: "Clientes",
      value: "156",
      icon: Users,
      color: "bg-[var(--celeste)]",
    },
    {
      title: "Órdenes",
      value: "32",
      icon: BarChart3,
      color: "bg-[var(--granate)]",
    },
  ]

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-[var(--gris-claro)] min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-[var(--azul-profundo)] mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[var(--rosa)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-[var(--azul-profundo)]">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-4 rounded-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[var(--gris-claro)]">
            <h2 className="text-2xl font-serif font-bold text-[var(--azul-profundo)] mb-4">Órdenes Recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[var(--gris-claro)]">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Cliente</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Producto</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Monto</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "#001",
                      customer: "María González",
                      product: "Ramo Rosas Rojas",
                      amount: "$89.99",
                      status: "Entregado",
                    },
                    {
                      id: "#002",
                      customer: "Juan López",
                      product: "Girasoles Tropicales",
                      amount: "$69.99",
                      status: "En Camino",
                    },
                    {
                      id: "#003",
                      customer: "Ana Martínez",
                      product: "Lirios Blancos",
                      amount: "$85.99",
                      status: "Procesando",
                    },
                  ].map((order, index) => (
                    <tr key={index} className="border-b border-[var(--gris-claro)] hover:bg-[var(--gris-claro)]">
                      <td className="py-3 px-4 text-[var(--azul-profundo)] font-semibold">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4 text-[var(--rosa)] font-semibold">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === "Entregado"
                              ? "bg-green-100 text-green-700"
                              : order.status === "En Camino"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
