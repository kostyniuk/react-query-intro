import './App.css'
import { useQuery } from '@tanstack/react-query'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const fetchPosts = async () => {
    await sleep(1000)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    return data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {data.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}

export default App
