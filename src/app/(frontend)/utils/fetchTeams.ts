const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export const fetchTeams = async (limit?: number) => {
  const url = new URL(`${baseUrl}/api/teams`);
  url.searchParams.append;
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString(), { cache: 'no-store' })
  const data = await res.json()
  return data.docs
}

export const fetchTeamById = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/teams/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return await res.json()
}
