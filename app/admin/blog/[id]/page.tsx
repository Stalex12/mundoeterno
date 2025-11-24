"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAdmin, AdminBlogPost } from "@/contexts/admin-context"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export default function EditBlogPost() {
  const { getBlogPost, updateBlogPost } = useAdmin()
  const router = useRouter()
  const params = useParams()
  const blogPostId = params.id as string
  const { toast } = useToast()

  const [postData, setPostData] = useState<AdminBlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  })
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoadingPost(true)
      setFetchError(null)
      const fetchedPost = await getBlogPost(blogPostId)
      if (fetchedPost) {
        setPostData(fetchedPost)
        setFormData({
          title: fetchedPost.title,
          content: fetchedPost.content,
          image_url: fetchedPost.image_url || "",
        })
      } else {
        setFetchError("Publicación de blog no encontrada o error al cargar.")
      }
      setIsLoadingPost(false)
    }
    fetchPost()
  }, [blogPostId, getBlogPost])

  if (isLoadingPost) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (fetchError || !postData) {
    return (
      <div className="flex justify-center items-center min-h-screen p-8">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {fetchError || "La publicación del blog no se pudo cargar."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await updateBlogPost(blogPostId, {
        title: formData.title,
        content: formData.content,
        image_url: formData.image_url || "/placeholder.svg",
      })
      router.push("/admin/blog")
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
    const file = e.target.files[0];
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

    setFormData((prev) => ({
      ...prev,
      image_url: publicUrlData.publicUrl,
    }));
    setIsUploading(false);
    toast({
      title: "Imagen subida",
      description: "La imagen se ha subido exitosamente.",
    });
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image_url: "",
    }));
    // TODO: Optionally, delete the image from Supabase Storage here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 bg-[var(--gris-claro)] min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-[var(--azul-profundo)] mb-8">Editar Artículo del Blog</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md border-2 border-[var(--gris-claro)]"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">Contenido</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--azul-profundo)] mb-2">
                  Imagen Principal
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full px-4 py-2 border-2 border-[var(--gris-claro)] rounded-lg focus:outline-none focus:border-[var(--rosa)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--rosa)] file:text-white hover:file:bg-[var(--rosa-oscuro)]"
                />
                {isUploading && (
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subiendo imagen...
                  </div>
                )}
                {formData.image_url && (
                  <div className="mt-4 relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.image_url} alt="Blog Post Image" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex-1"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="border-2 border-[var(--gris-claro)] text-[var(--azul-profundo)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--gris-claro)] transition-colors flex-1"
                  disabled={isSubmitting || isUploading}
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
