import logoIcon from "@/assets/logo-icon.svg"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { useAuthStore } from "@/stores/auth"
import { LogInIcon } from "lucide-react"

import { useState } from "react"
import { Link } from "react-router-dom"

export function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signUp = useAuthStore((store) => store.signUp)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      const signUpResult = await signUp({ name, email, password })

      if (signUpResult) {
        toast.add({
          title: "Cadastro realizado com sucesso!",
          type: "success",
        })
      }
    } catch (error) {
      let message = "Erro ao fazer cadastro. Por favor, tente novamente."

      if (error instanceof Error && !!error?.message) {
        message = error.message
      }

      toast.add({ title: message, type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8">
      <img src={logoIcon} alt="Logo" className="h-8 w-33" />

      <Card className="w-full max-w-md rounded-xl px-2 py-8">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-center text-base font-normal text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
              <span className="text-xs text-gray-500">
                A senha deve ter no mínimo 8 caracteres
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-base py-6 text-base hover:bg-brand-dark"
              disabled={loading}
            >
              Cadastrar
            </Button>
          </form>

          <div className="my-6 flex items-center gap-2">
            <hr className="flex-1" />
            <span className="px-2 text-gray-500">ou</span>
            <hr className="flex-1" />
          </div>

          <p className="mb-4 text-center text-sm font-normal text-gray-600">
            Já tem uma conta?
          </p>

          <Button
            variant={"outline"}
            className="w-full bg-transparent py-6 text-base"
          >
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 text-gray-700"
            >
              <LogInIcon />
              Fazer login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
