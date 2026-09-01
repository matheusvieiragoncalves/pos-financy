import { Link, useLocation } from "react-router-dom"
import logoIcon from "../assets/logo-icon.svg"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

export function Header() {
  const location = useLocation()
  const isAuthenticated = false

  const user = { name: "Matheus" }

  const menuOptions = [
    { name: "Dashboard", path: "/" },
    { name: "Transações", path: "/members" },
    { name: "Categorias", path: "/categories" },
  ]

  return !isAuthenticated ? (
    <></>
  ) : (
    <div className="w-full px-16 pt-6">
      <header className="flex w-full justify-between">
        <div>
          <img src={logoIcon} alt="Logo" />
        </div>
        <div className="flex items-center gap-4">
          {menuOptions.map((item) => (
            <Link key={item.name} to={item.path}>
              <Button
                size="sm"
                className="gap-2"
                variant={"link"}
                // Todo: Ajustar cor
                style={location.pathname === item.path ? { color: "red" } : {}}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <Avatar>
            <AvatarFallback className="bg-zinc-950 text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  )
}
