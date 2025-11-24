"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Loader2, UploadCloud } from "lucide-react"

export default function NewProduct() {
  const { addProduct } = useAdmin()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_urls: [] as string[], // Changed to array of strings
    category: "rosas",
    stock: "",
    featured: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const parsedPrice = Number.parseFloat(formData.price);
    const parsedStock = Number.parseInt(formData.stock);

    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
      toast({
        title: "Error de validación",
        description: "El precio y el stock deben ser números válidos.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await addProduct({
        name: formData.name,
        price: parsedPrice,
        description: formData.description,
        image_urls: formData.image_urls.length > 0 ? formData.image_urls : ["/placeholder.svg"],
        category: formData.category,
        stock: parsedStock,
        featured: formData.featured,
      })
      router.push("/admin/products")
    } catch (error) {
      // Error handled by context's toast
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast({
        title: "Error de carga",
        description: "Debe seleccionar una imagen para subir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`; // Store directly in the 'images' bucket root for simplicity

      const { data, error } = await supabase.storage
        .from("images") // Use the 'images' bucket
        .upload(filePath, file);

      if (error) {
        toast({
          title: "Error al subir imagen",
          description: error.message,
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    setFormData((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, ...uploadedUrls],
    }));
    setIsUploading(false);
    toast({
      title: "Imágenes subidas",
      description: "Las imágenes se han subido exitosamente.",
    });
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((url) => url !== urlToRemove),
    }));
    // TODO: Optionally, delete the image from Supabase Storage here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-[var(--gris-claro)] min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-[var(--azul-profundo)] mb-8">Nuevo Producto</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md border-2 border-[var(--gris-claro)]"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="Ej: Ramo de Rosas Rojas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                    placeholder="89.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                  placeholder="Describe el producto..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                >
                  <option value="rosas">Rosas</option>
                  <option value="silvestres">Silvestres</option>
                  <option value="girasoles">Girasoles</option>
                  <option value="lirios">Lirios</option>
                  <option value="orquideas">Orquídeas</option>
                  <option value="margaritas">Margaritas</option>
                  <option value="tulipanes">Tulipanes</option>
                  <option value="peonias">Peonías</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Imágenes del Producto
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--rosa)] file:text-white hover:file:bg-[var(--rosa-oscuro)]"
                />
                {isUploading && (
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subiendo imágenes...
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.image_urls.map((url, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={url} alt={`Product Image ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-[var(--azul-profundo)]">
                  Marcar como destacado
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex-1"
                >
                  Crear Producto
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="border-2 border-[var(--gris-claro)] text-[var(--azul-profundo)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--gris-claro)] transition-colors flex-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
