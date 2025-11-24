"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useStoreConfig } from "@/hooks/use-store-config"
import { Save, Store, Mail, Phone, MapPin, Clock, Share2, CheckCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export default function AdminSettings() {
  const { config, updateConfig, isLoading } = useStoreConfig()
  const [formData, setFormData] = useState(config)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }))
  }

  const handleHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      updateConfig(formData)
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <Spinner className="size-12 text-purple-600 mx-auto" />
          <p className="text-gray-600 text-lg">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              Configuración de la Tienda
            </h1>
            <p className="text-gray-600">
              Personaliza la información de tu florería
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="text-green-600" size={24} />
              <p className="text-green-800 font-semibold">¡Configuración guardada exitosamente!</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Store Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Store className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Información General
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de la Tienda
                  </label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Mundo Eterno"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email de Contacto
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="info@mundoeterno.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="+591 789 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp (solo números)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="59178900000"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Av. Principal #123, Santa Cruz, Bolivia"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tu destino para las flores más frescas y hermosas"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center">
                  <Share2 className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Redes Sociales
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.facebook || ''}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.instagram || ''}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Horario de Atención
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <label className="w-32 text-sm font-semibold text-gray-700 capitalize">
                      {day === 'monday' ? 'Lunes' :
                        day === 'tuesday' ? 'Martes' :
                          day === 'wednesday' ? 'Miércoles' :
                            day === 'thursday' ? 'Jueves' :
                              day === 'friday' ? 'Viernes' :
                                day === 'saturday' ? 'Sábado' : 'Domingo'}
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleHoursChange(day, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="9:00 AM - 6:00 PM"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Spinner className="size-5" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Guardar Configuración
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
