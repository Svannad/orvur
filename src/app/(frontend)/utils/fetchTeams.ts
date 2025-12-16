const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

// utils/fetchTeams.ts
export const fetchTeams = async (limit?: number) => {
  const url = new URL(`${baseUrl}/api/teams`)
  url.searchParams.append('sort', 'createdAt');
  if (limit) url.searchParams.append('limit', limit.toString())

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' })

    // ✅ handle HTTP errors
    if (!res.ok) {
      throw new Error(`Failed to fetch teams: ${res.status}`)
    }

    const data = await res.json()

    // ✅ validate structure
    if (!data?.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid teams response format')
    }

    return data.docs
  } catch (error) {
    console.error('fetchTeams error:', error)

    // ✅ safe fallback
    return []
  }
}

export const fetchTeamById = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/teams/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return await res.json()
}
