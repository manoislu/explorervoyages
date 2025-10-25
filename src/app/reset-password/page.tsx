// src/app/reset-password/page.tsx
import AuthLayout from '@/components/auth/AuthLayout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      title="Réinitialiser votre mot de passe"
      subtitle="Entrez votre nouveau mot de passe ci-dessous."
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}