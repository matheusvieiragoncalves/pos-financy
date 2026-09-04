import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  InputGroupInput,
} from "@/components/ui/input-group"
import { useAuthStore } from "@/stores/auth"
import { LogOut, Mail, UserRound } from "lucide-react"

import { useState } from "react"

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  const logout = useAuthStore((state) => state.logout)
  const update = useAuthStore((state) => state.updateUser)

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()

    if (!name) return

    update({ name })
  }

  return (
    <div className="flex min-h-[calc(90vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md gap-0 rounded-xl px-2 py-8">
        <CardHeader className="flex flex-col items-center gap-0">
          <Avatar className="size-16">
            <AvatarFallback className="bg-gray-300 text-2xl text-gray-800">
              {user ? user.name?.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-6 mb-1 text-center text-xl font-bold">
            {user?.name}
          </CardTitle>
          <CardDescription className="text-center text-base font-normal text-gray-600">
            {user?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <hr className="mt-8 mb-8" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldSet className="flex flex-col gap-4">
              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Nome completo
                </FieldLabel>
                <InputGroup className="flex items-center gap-2 rounded-lg border-gray-400 bg-white py-6 text-base">
                  <InputGroupInput
                    id="name"
                    placeholder="Digite seu nome completo"
                    className="text-base placeholder:text-base placeholder:text-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputGroupAddon align="inline-start">
                    <UserRound className="size-4 text-gray-400" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  E-mail
                </FieldLabel>
                <InputGroup className="flex items-center gap-2 rounded-lg border-gray-400 bg-white py-6 text-base opacity-90">
                  <InputGroupInput
                    id="email"
                    placeholder="Digite seu e-mail"
                    className="text-base placeholder:text-base placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-gray-400" />
                  </InputGroupAddon>
                </InputGroup>
                <span className="text-xs text-gray-500">
                  O e-mail não pode ser alterado
                </span>
              </Field>

              <Button
                type="submit"
                className="mt-4 w-full bg-brand-base py-6 text-base hover:bg-brand-dark"
                disabled={!name || user?.name === name}
              >
                Salvar alterações
              </Button>
              <Button
                type="button"
                className="flex w-full items-center justify-center gap-2 border border-gray-300 bg-white py-6 text-base text-gray-700 hover:bg-gray-100"
                onClick={logout}
              >
                <LogOut className="size-4.5 text-danger" />
                Sair da conta
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
