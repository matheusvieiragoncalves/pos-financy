import { Header } from "./Header"
import { Toaster } from "./ui/toast"

interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <main className="mx-auto px-16 py-4">{children}</main>
      <Toaster />
    </div>
  )
}

export { Layout }
