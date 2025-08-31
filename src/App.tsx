import { useState } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const fetchPosts = async () => {
    await sleep(1000)
    const response = await fetch(`https://api.github.com/users/kostyniuk/repos?per_page=5&page=${page}`)
    const data = await response.json()
    return data
  }

  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['repos', page],
    queryFn: fetchPosts,
    staleTime: 1000 * 2,
  })


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {data.map((repo: any) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
      <button onClick={() => setPage(prev => prev - 1)}>Previous Page</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next Page</button>
    </>
  )
}

export default App
