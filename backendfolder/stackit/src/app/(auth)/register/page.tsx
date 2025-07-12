import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Join StackIt</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start asking and answering questions
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}