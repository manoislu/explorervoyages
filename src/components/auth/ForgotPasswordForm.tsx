'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

export default function ForgotPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsSignedIn(!!user)
    }
    checkUser()
  }, [])

  useEffect(() => {
    setIsButtonDisabled(isSignedIn)
  }, [isSignedIn])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Supabase reset password (le typage est optionnel)
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (authError) {
      setError("Impossible de trouver un compte associé à cette adresse e-mail.")
    } else {
      setSuccess("Si un compte existe avec cet e-mail, vous recevrez un lien pour réinitialiser votre mot de passe.")
    }

    setLoading(false)
  }

  return (
    <>
      {error && <p className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {success && <p className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">{success}</p>}
      
      <form onSubmit={handleResetPassword} className="space-y-8">
        <div>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50"
              placeholder="vous@exemple.com"
            />
          </div>
          <div className="text-center text-sm leading-6 mt-4">
            <span className="text-gray-500">Vous vous souvenez de votre mot de passe ?</span>{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Connectez-vous
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || isButtonDisabled}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </button>
        </div>
      </form>
    </>
  )
}