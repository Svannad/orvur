// utils/fetchTeams.ts
export const fetchTeams = async (limit?: number) => {
  try {
    const url = new URL('http://localhost:3000/api/teams')
    url.searchParams.append('sort', 'createdAt')
    if (limit) url.searchParams.append('limit', limit.toString())

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
  try {
    const res = await fetch(`http://localhost:3000/api/teams/${id}`, {
      cache: 'no-store',
    })

    // ✅ handle HTTP errors
    if (!res.ok) {
      throw new Error(`Failed to fetch team ${id}: ${res.status}`)
    }

    const data = await res.json()

    if (!data) {
      throw new Error('Empty team response')
    }

    return data
  } catch (error) {
    console.error('fetchTeamById error:', error)

    // ✅ safe fallback
    return null
  }
}
