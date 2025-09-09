import { useQuery } from "@tanstack/react-query";
import { loadRepos } from "../api/data";

export default function Dashboard() {
  const repos = useQuery({
    queryKey: ["repos"],
    queryFn: () => loadRepos(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  return <>
  <h1>Dashboard</h1>
    {repos.data.map((repo: any) => (
      <p key={repo.id}>{repo.name}</p>
    ))}
  </> 
}
