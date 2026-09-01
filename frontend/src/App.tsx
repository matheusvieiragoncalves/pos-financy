import { Layout } from "@/components/Layout"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/auth/Login"

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = { isAuthenticated: true }
//   return isAuthenticated ? children : <Navigate to="/dashboard" replace />
// }

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = { isAuthenticated: false }
  return !isAuthenticated ? children : <Navigate to="/" replace />
}

export function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
