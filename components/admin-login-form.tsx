"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redireccionando al panel de administración...",
      })
      router.push("/admin/products") // Redirect to products page after successful login
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--gris-claro)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-serif text-[var(--azul-profundo)]">Acceso de Administrador</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico y contraseña para acceder al panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-[var(--rosa)] hover:bg-[var(--rosa-oscuro)] text-white" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
