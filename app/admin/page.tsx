"use client"

import AdminLoginForm from "@/components/admin-login-form"
import AdminDashboardContent from "@/components/admin-dashboard-content"
import { useAdminAuth } from "@/hooks/use-user-session"
import { Spinner } from "@/components/ui/spinner"

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdminAuth("/admin")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLoginForm />
  }

  return <AdminDashboardContent />
}
