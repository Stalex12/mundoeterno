"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react"

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

export default function BlogPostPage() {
  const params = useParams()
  const blogPostId = params.id as string

  const [blogPost, setBlogPost] = useState<PublicBlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authorName, setAuthorName] = useState<string>("Cargando...")

  useEffect(() => {
    const fetchBlogPostData = async () => {
      setIsLoading(true)
      setError(null)
      setAuthorName("Cargando...")

      // Fetch blog post
      const { data: postData, error: postError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", blogPostId)
        .single()

      if (postError) {
        setError(postError.message)
        setBlogPost(null)
        setIsLoading(false)
        return
      }

      setBlogPost(postData as PublicBlogPost)

      // Fetch author
      if (postData?.author_id) {
        const { data: authorData, error: authorError } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", postData.author_id)
          .single()

        if (authorError) {
          console.error("Error fetching author:", authorError.message)
          setAuthorName("Desconocido")
        } else if (authorData) {
          setAuthorName(authorData.full_name || "Desconocido")
        }
      } else {
        setAuthorName("Desconocido")
      }
      setIsLoading(false)
    }

    if (blogPostId) {
      fetchBlogPostData()
    }
  }, [blogPostId])

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Spinner className="size-12 text-purple-600" />
          <p className="text-gray-500 text-lg">Cargando artículo...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center p-8">
          <Alert variant="destructive" className="max-w-lg">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Error al cargar la publicación</AlertTitle>
            <AlertDescription className="text-base">{error || "Publicación no encontrada."}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al blog
        </Link>

        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          {blogPost.image_url && (
            <div className="relative w-full h-96 md:h-[500px]">
              <Image
                src={blogPost.image_url}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Escrito por</p>
                  <p className="font-semibold text-gray-900">{authorName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>
                  {blogPost.published_at
                    ? new Date(blogPost.published_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{getReadingTime(blogPost.content)} min de lectura</span>
              </div>

              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors font-semibold"
              >
                <Share2 size={18} />
                Compartir
              </button>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Author Card */}
            <div className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Autor</p>
                  <p className="text-xl font-serif font-bold text-gray-900">{authorName}</p>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-lg group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Ver más artículos
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
