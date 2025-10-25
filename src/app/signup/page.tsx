// src/app/signup/page.tsx
import AuthLayout from '@/components/auth/AuthLayout'
import SignupForm from '@/components/auth/SignupForm'

export default function SignUpPage() {
  return (
    <AuthLayout title="Créer un compte"> {/* MODIFICATION : La prop subtitle a été retirée */}
      <SignupForm />
    </AuthLayout>
  )
}