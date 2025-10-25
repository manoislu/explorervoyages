// src/app/reset-password/page.tsx
import AuthLayout from '@/components/auth/AuthLayout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      title="Réinitialisez le mot de passe"
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}