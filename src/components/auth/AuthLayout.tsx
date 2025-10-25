// src/components/auth/auth-layout.tsx
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: ReactNode
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1585937422602-5701c00014cc?q=80&w=2940&auto=format&fit=crop)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-sm p-4 lg:p-8">
        <div className="rounded-lg bg-white p-8 shadow-xl">
          <div>
            <img
              alt="Logo Explorer Voyages"
              src="/images/logo.png"
              className="mx-auto h-12 w-auto"
            />
            <p className="mt-4 text-center text-sm font-medium text-gray-600">
              Votre assistant de voyages intelligent
            </p>
            <div className="mt-8">
              <p className="text-center text-xl font-normal leading-9 tracking-tight text-gray-900">
                {title}
              </p>
            </div>
            {subtitle && <p className="mt-2 text-center text-sm leading-6 text-gray-500">{subtitle}</p>}
          </div>

          <div className="mt-6"> {/* MODIFICATION : mt-10 -> mt-6 pour réduire l'espace */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}