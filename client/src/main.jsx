import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <Error />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/admin",
        element: <div>Admin Page</div>
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
