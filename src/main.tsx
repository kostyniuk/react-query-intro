import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Above from './pages/Above.tsx'
import { loadRepos } from './api/data.ts'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: async () => {
          const repos = await loadRepos()
          return { repos }
        },
      },
      {
        path: "above", 
        element: <Above />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>  
        <RouterProvider router={router} />
        <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
