// src/app/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Navbar from '@/components/Navbar' // Nous allons créer ce composant juste après
import { Toaster } from 'react-hot-toast'

import './globals.css'

export const metadata = {
  title: 'Explorer Voyages',
  description: 'Votre assistant de voyages intelligent.',
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
    return (
      <html lang="fr">
      <body className="bg-gray-50">
        <div className="min-h-screen">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}