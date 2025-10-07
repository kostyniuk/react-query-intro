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
          await queryClient.ensureQueryData({
            queryKey: ["repos"],
            queryFn: () => loadRepos(),
            staleTime: 1000 * 60 * 5, // 5 minutes
          });

/**
 * - 

prefetchQuery
→ Starts fetching and caches the result, but doesn’t return the data to you — 
it just ensures the cache will have it when you need it later.
Think of it as: “Start loading this quietly in the background.”

- 
ensureQueryData (or ensureQuery)
→ Fetches (if needed) and returns the data once it’s ready.
Think of it as: “Make sure this data exists — and give it to me when it’s ready.”
 */

          return { repos: queryClient.getQueryData(["repos"]) }
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
