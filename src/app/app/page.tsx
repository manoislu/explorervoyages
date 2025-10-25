import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import { createServer } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  // On appelle cookies() et on passe l'objet au createServer
  const cookieStore = cookies()
  const supabase = createServer(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Rediriger si l'utilisateur n'est pas connecté
  if (!user) {
    return redirect('/login')
  }

  // Utiliser une valeur par défaut sûre pour le prénom
  const firstName =
    (user.user_metadata && user.user_metadata.first_name) ||
    user.email?.split('@')[0] ||
    'utilisateur'

  return (
    <>
      <Navbar />
      <Toaster />

      <main className="p-8">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Bienvenue, {firstName} !
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            C&apos;est fantastique de vous avoir parmi nous. Que souhaitez-vous faire aujourd&apos;hui ?
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte: Créer un nouveau voyage */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition duration-300">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Créer un nouveau voyage</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Planifiez votre prochaine aventure en quelques clics.
                </p>
                <Link
                  href="/app/trips/new"
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Commencer
                </Link>
              </div>
            </div>

            {/* Carte: Mes Voyages */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Mes Voyages</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Accédez à tous vos projets passés et à venir.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Vous n&apos;avez pas encore de voyage.</p>
                </div>
              </div>
            </div>

            {/* Carte: Profil Utilisateur */}
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition duration-300">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Profil Utilisateur</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Gérez vos informations personnelles et vos préférences.
                </p>
                <Link
                  href="/app/account"
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Gérer mon profil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}