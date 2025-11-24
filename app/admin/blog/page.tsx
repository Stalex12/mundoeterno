"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Plus, Trash2, Edit2, Search, FileText, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useAdmin, AdminBlogPost } from "@/contexts/admin-context"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { supabase } from "@/lib/supabase"

interface AuthorProfile {
  id: string;
  full_name: string;
}

export default function AdminBlog() {
  const { blogPosts, isLoadingBlogPosts, errorBlogPosts, deleteBlogPost } = useAdmin();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Map<string, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      if (blogPosts.length > 0) {
        const uniqueAuthorIds = Array.from(new Set(blogPosts.map(post => post.author_id)));
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", uniqueAuthorIds);

        if (error) {
          console.error("Error fetching authors:", error.message);
          return;
        }

        const newAuthorsMap = new Map<string, string>();
        data.forEach((profile: AuthorProfile) => {
          newAuthorsMap.set(profile.id, profile.full_name || "Desconocido");
        });
        setAuthors(newAuthorsMap);
      }
    };

    fetchAuthors();
  }, [blogPosts]);

  const handleDelete = async (postId: string) => {
    setIsDeleting(true);
    await deleteBlogPost(postId);
    setIsDeleting(false);
    setConfirmDelete(null);
  };

  const filteredPosts = blogPosts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingBlogPosts) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <Spinner className="size-12 text-purple-600 mx-auto" />
          <p className="text-gray-600 text-lg">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  if (errorBlogPosts) {
    return (
      <div className="flex justify-center items-center min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <Alert variant="destructive" className="max-w-lg">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
          <AlertDescription className="text-base">{errorBlogPosts}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                  Gestión de Blog
                </h1>
                <p className="text-gray-600">
                  Administra tus artículos y publicaciones
                </p>
              </div>
              <Link
                href="/admin/blog/new"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Nuevo Artículo
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar artículos por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <FileText className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No hay artículos
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? `No se encontraron artículos para "${searchQuery}"` : "Comienza escribiendo tu primer artículo"}
              </p>
              {!searchQuery && (
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Plus size={20} />
                  Crear Artículo
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Post Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="text-gray-300" size={48} />
                      </div>
                    )}
                  </div>

                  {/* Post Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>Por {authors.get(post.author_id) || "Cargando..."}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                          : "Sin publicar"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold"
                      >
                        <Edit2 size={16} />
                        Editar
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(post.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Confirmar Eliminación</h3>
                  <p className="text-red-100 text-sm">Esta acción no se puede deshacer</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 text-lg mb-2">
                ¿Estás seguro de que deseas eliminar este artículo?
              </p>
              <p className="text-gray-600 mb-6">
                <span className="font-semibold">
                  {blogPosts.find(p => p.id === confirmDelete)?.title}
                </span>
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Spinner className="size-5" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
