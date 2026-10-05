// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App'
import Home from './pages/Home'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <App /> }, // Renders at "/"
    ],
  },
  {
    path: '/home',
    children: [
      { index: true, element: <Home /> }, // Renders at "/"
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
