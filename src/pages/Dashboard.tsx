import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const data = useLoaderData() as { repos: any }

  console.log(data)
  return <>
  <h1>Dashboard</h1>
    {data.repos.map((repo: any) => (
      <p key={repo.id}>{repo.name}</p>
    ))}
  </> 
}
