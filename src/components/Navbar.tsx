'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Erreur lors de la déconnexion.")
    } else {
      toast.success("Déconnexion réussie.")
      router.push('/login')
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/app" className="flex-shrink-0">
              <Image
                alt="Explorer Voyages"
                src="/images/logo.png"
                className="h-8 w-auto"
                width={40}
                height={40}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4 sm:ml-6 lg:ml-8">
            <Link
              href="/app/trips/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-3 py-2 text-sm"
            >
              Nouveau Voyage
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      {/* Optionnel : Toaster ici pour afficher les toast globalement */}
      <Toaster />
    </nav>
  )
}