import logoIcon from "@/assets/logo-icon.svg"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel, FieldSet } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { toast } from "@/components/ui/toast"
import { useAuthStore } from "@/stores/auth"
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react"

import { useState } from "react"
import { Link } from "react-router-dom"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const login = useAuthStore((state) => state.login)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      const loginMutation = await login({ email, password })

      if (loginMutation) {
        toast.add({
          title: "Login realizado com sucesso!",
          type: "success",
        })
      }
    } catch (error) {
      let message = "Erro ao fazer login. Por favor, tente novamente."

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
            Fazer login
          </CardTitle>
          <CardDescription className="text-center text-base font-normal text-gray-600">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldSet className="flex flex-col gap-4">
              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  E-mail
                </FieldLabel>
                <InputGroup className="flex items-center gap-0 rounded-lg border-gray-400 bg-white py-6 text-base opacity-90">
                  <InputGroupInput
                    id="email"
                    placeholder="mail@exemplo.com"
                    className="text-base placeholder:text-base placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-gray-400" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Senha
                </FieldLabel>
                <InputGroup className="flex items-center gap-0 rounded-lg border-gray-400 bg-white py-6 text-base opacity-90">
                  <InputGroupInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="text-base placeholder:text-base placeholder:text-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4 text-gray-400" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      size="icon-xs"
                    >
                      {isPasswordVisible ? <Eye /> : <EyeClosed />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <div className="flex flex-row justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Lembrar-me
                </label>
                <Link to="/recover-password">Recuperar senha</Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-base py-6 text-base hover:bg-brand-dark"
                disabled={loading}
              >
                Entrar
              </Button>
            </FieldSet>
          </form>

          <div className="my-6 flex items-center gap-2">
            <hr className="flex-1" />
            <span className="px-2">ou</span>
            <hr className="flex-1" />
          </div>

          <p className="mb-4 text-center">Ainda não tem uma conta?</p>

          <Button
            variant={"outline"}
            className="w-full bg-transparent py-6 text-base"
          >
            <Link
              to="/sign-up"
              className="flex flex-1 items-center justify-center gap-2"
            >
              <UserRoundPlus />
              Criar conta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
