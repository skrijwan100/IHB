import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OfficerTouristRegistration from "./components/OffisirRgister.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/admin",
        element: <OfficerTouristRegistration/>
      },
      {
        path: "/dashboard",
        element: <div>Dashboard Page</div>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
