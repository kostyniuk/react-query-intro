export const loadRepos = async () => {
  const response = await fetch('https://api.github.com/users/kostyniuk/repos')
  return response.json()
}