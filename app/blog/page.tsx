"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface PublicBlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  image_url: string;
  published_at?: string;
  updated_at?: string;
}

interface AuthorProfile {
  id: string;
  full_name: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<PublicBlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authors, setAuthors] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true)
      setError(null)

      // Fetch blog posts
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false })

      if (postsError) {
        setError(postsError.message)
        setBlogPosts([])
        setIsLoading(false)
        return
      }

      setBlogPosts(postsData as PublicBlogPost[])

      // Fetch authors
      if (postsData && postsData.length > 0) {
        const uniqueAuthorIds = Array.from(new Set(postsData.map(post => post.author_id)));
        const { data: authorsData, error: authorsError } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", uniqueAuthorIds);

        if (authorsError) {
          console.error("Error fetching authors:", authorsError.message);
        } else if (authorsData) {
          const newAuthorsMap = new Map<string, string>();
          authorsData.forEach((profile: AuthorProfile) => {
            newAuthorsMap.set(profile.id, profile.full_name || "Desconocido");
          });
          setAuthors(newAuthorsMap);
        }
      }
      setIsLoading(false)
    }

    fetchBlogData()
  }, [])

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, content.lastIndexOf(" ", maxLength)) + "...";
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Spinner className="size-12 text-purple-600" />
          <p className="text-gray-500 text-lg">Cargando artículos...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center p-8">
          <Alert variant="destructive" className="max-w-lg">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Error al cargar el blog</AlertTitle>
            <AlertDescription className="text-base">{error}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    )
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
              <h2>Blog de la Florería</h2>
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900">
            Historias Florales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Consejos, tendencias y cuidados para amantes de las flores
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay publicaciones disponibles
            </h3>
            <p className="text-gray-500 text-lg">
              Vuelve pronto para leer nuestros últimos artículos
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <Link href={`/blog/${featuredPost.id}`}>
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <Image
                          src={featuredPost.image_url || "/placeholder.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            ⭐ Destacado
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                          {getExcerpt(featuredPost.content, 200)}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{authors.get(featuredPost.author_id) || "Autor"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>
                              {featuredPost.published_at
                                ? new Date(featuredPost.published_at).toLocaleDateString('es-ES', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{getReadingTime(featuredPost.content)} min de lectura</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                          <h2>Leer artículo completo</h2>
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Más Artículos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group"
                    >
                      <div
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col"
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={post.image_url || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                            {getExcerpt(post.content)}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{authors.get(post.author_id) || "Autor"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {post.published_at
                                  ? new Date(post.published_at).toLocaleDateString('es-ES', {
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{getReadingTime(post.content)} min</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            Leer más
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
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
