import { Layout } from "@/components/Layout"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/auth/Login"
import { SignUpPage } from "./pages/auth/SignUp"
import { DashboardPage } from "./pages/dashboard"

const isAuthenticated = true

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  return !isAuthenticated ? children : <Navigate to="/" replace />
}

export function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
