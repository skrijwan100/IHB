import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OfficerTouristRegistration from "./components/OffisirRgister.jsx"
import {ProtectRoute, AuthenticatedUserRoute} from "./utils/userAuthenticated.jsx"

import DashboardPage from './pages/DashboardPage.jsx'
import GovernmentVerificationPage from './pages/VerifyPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticatedUserRoute>
            <LoginPage />
          </AuthenticatedUserRoute>
        )
      },
      {
        path: "/admin",
        element: (
            <OfficerTouristRegistration />
        )
      },
      {
        path: "/dashboard",
        element: (
          <ProtectRoute>
              <DashboardPage />
          </ProtectRoute>
        )
      },
      {
        path: "/:id",
        element: (
              <GovernmentVerificationPage />
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
