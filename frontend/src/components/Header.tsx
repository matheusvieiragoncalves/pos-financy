import { Link, useLocation } from "react-router-dom"
import logoIcon from "../assets/logo-icon.svg"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

export function Header() {
  const location = useLocation()
  const isAuthenticated = true

  const user = { name: "Matheus" }

  const menuOptions = [
    { name: "Dashboard", path: "/" },
    { name: "Transações", path: "/members" },
    { name: "Categorias", path: "/categories" },
  ]

  return !isAuthenticated ? (
    <></>
  ) : (
    <header className="flex w-full items-center justify-between bg-white px-12 py-5.5">
      <div>
        <img src={logoIcon} alt="Logo" />
      </div>
      <div className="flex items-center gap-5">
        {menuOptions.map((item) => (
          <Link key={item.name} to={item.path}>
            <Button
              size="sm"
              className={
                location.pathname === item.path
                  ? "gap-2 text-sm font-semibold text-brand-base hover:no-underline"
                  : "gap-2 text-sm font-semibold hover:no-underline"
              }
              variant={"link"}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <Link to="/profile">
          <Avatar>
            <AvatarFallback className="text-ms bg-gray-300 text-gray-800">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
