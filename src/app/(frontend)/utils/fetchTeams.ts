export const fetchTeams = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/teams`)
  url.searchParams.append('sort', 'createdAt');
  if (limit) url.searchParams.append('limit', limit.toString())

  const res = await fetch(url.toString(), { cache: 'no-store' })
  const data = await res.json()
  return data.docs
}

export const fetchTeamById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/teams/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return await res.json()
}
