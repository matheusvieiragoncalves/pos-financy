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

import { useState } from "react"
import { Link } from "react-router-dom"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      const loginMutation = "fake data"

      if (loginMutation) {
        toast.add({
          title: "Login realizado com sucesso!",
          type: "success",
        })
      }
    } catch (error) {
      toast.add({
        title: "Erro ao fazer login. Por favor, tente novamente.",
        type: "error",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
      <img src={logoIcon} alt="Logo" className="h-22 w-64" />

      <Card className="w-full max-w-md rounded-xl px-4 py-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Fazer login
          </CardTitle>
          <CardDescription className="text-center">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">E-mail</label>
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
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-row justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Lembrar-me
              </label>
              <Link to="/recover-password">Recuperar senha</Link>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base"
              disabled={loading}
            >
              Entrar
            </Button>
          </form>

          <div className="my-6 flex items-center gap-2">
            <hr className="flex-1" />
            <span className="px-2">ou</span>
            <hr className="flex-1" />
          </div>

          <p className="mb-4 text-center">Ainda não tem uma conta?</p>

          <Button variant={"outline"} className="w-full py-6 text-base">
            <Link to="/sign-up" className="flex flex-1 justify-center">
              Criar conta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
