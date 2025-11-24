"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image_urls: string[];
  category: string;
  stock: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string; // UUID of the auth.users table
  image_url: string;
  published_at?: string;
  updated_at?: string;
}

interface AdminContextType {
  products: AdminProduct[];
  isLoadingProducts: boolean;
  errorProducts: string | null;
  addProduct: (product: Omit<AdminProduct, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateProduct: (id: string, product: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Promise<AdminProduct | undefined>;

  blogPosts: AdminBlogPost[];
  isLoadingBlogPosts: boolean;
  errorBlogPosts: string | null;
  addBlogPost: (post: Omit<AdminBlogPost, "id" | "published_at" | "updated_at" | "author_id">) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<AdminBlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  getBlogPost: (id: string) => Promise<AdminBlogPost | undefined>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
  const [isLoadingBlogPosts, setIsLoadingBlogPosts] = useState(true);
  const [errorBlogPosts, setErrorBlogPosts] = useState<string | null>(null);
  const { toast } = useToast();

  // --- Product CRUD Operations ---

  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setErrorProducts(null);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorProducts(error.message);
      toast({
        title: "Error al cargar productos",
        description: error.message,
        variant: "destructive",
      });
      setProducts([]);
    } else {
      setProducts(data as AdminProduct[]);
    }
    setIsLoadingProducts(false);
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Omit<AdminProduct, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

      if (error) throw error;

      setProducts((prev) => [data as AdminProduct, ...prev]);
      toast({
        title: "Producto añadido",
        description: `"${product.name}" ha sido añadido exitosamente.`,
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al añadir producto",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const updateProduct = useCallback(async (id: string, updates: Partial<AdminProduct>) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setProducts((prev) => prev.map((p) => (p.id === id ? (data as AdminProduct) : p)));
      toast({
        title: "Producto actualizado",
        description: `El producto "${updates.name || id}" ha sido actualizado.`,
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al actualizar producto",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente.",
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al eliminar producto",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const getProduct = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      toast({
        title: "Error al obtener producto",
        description: error.message,
        variant: "destructive",
      });
      return undefined;
    }
    return data as AdminProduct;
  }, [toast]);

  // --- Blog Post CRUD Operations ---

  const fetchBlogPosts = useCallback(async () => {
    setIsLoadingBlogPosts(true);
    setErrorBlogPosts(null);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      setErrorBlogPosts(error.message);
      toast({
        title: "Error al cargar publicaciones del blog",
        description: error.message,
        variant: "destructive",
      });
      setBlogPosts([]);
    } else {
      setBlogPosts(data as AdminBlogPost[]);
    }
    setIsLoadingBlogPosts(false);
  }, [toast]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  const addBlogPost = useCallback(async (post: Omit<AdminBlogPost, "id" | "published_at" | "updated_at" | "author_id">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .insert({ ...post, author_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setBlogPosts((prev) => [data as AdminBlogPost, ...prev]);
      toast({
        title: "Publicación de blog añadida",
        description: `"${post.title}" ha sido añadido exitosamente.`,
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al añadir publicación de blog",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const updateBlogPost = useCallback(async (id: string, updates: Partial<AdminBlogPost>) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setBlogPosts((prev) => prev.map((p) => (p.id === id ? (data as AdminBlogPost) : p)));
      toast({
        title: "Publicación de blog actualizada",
        description: `La publicación "${updates.title || id}" ha sido actualizada.`,
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al actualizar publicación de blog",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const deleteBlogPost = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;

      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Publicación de blog eliminada",
        description: "La publicación ha sido eliminada exitosamente.",
      });
      return Promise.resolve();
    } catch (err: any) {
      toast({
        title: "Error al eliminar publicación de blog",
        description: err.message,
        variant: "destructive",
      });
      return Promise.reject(err);
    }
  }, [toast]);

  const getBlogPost = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      toast({
        title: "Error al obtener publicación del blog",
        description: error.message,
        variant: "destructive",
      });
      return undefined;
    }
    return data as AdminBlogPost;
  }, [toast]);

  return (
    <AdminContext.Provider
      value={{
        products,
        isLoadingProducts,
        errorProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        blogPosts,
        isLoadingBlogPosts,
        errorBlogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        getBlogPost,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}
