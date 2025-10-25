// src/app/login/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.get('message')) {
      setMessage(searchParams.get('message'))
    }
  }, [searchParams])

  return (
    <AuthLayout title="Bienvenue"> {/* TITRE MODIFIÉ ET SUBTITLE RETIRÉ */}
      {message && <p className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">{message}</p>}
      <LoginForm />
    </AuthLayout>
  )
}