// src/app/forgot-password/page.tsx
import AuthLayout from '@/components/auth/AuthLayout'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      title="Mot de passe oublié"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}