const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export const fetchComps = async (limit?: number) => {
  try {
    const url = new URL('${baseUrl}/api/competitions')
    url.searchParams.append('depth', '1')
    if (limit) url.searchParams.append('limit', limit.toString())

    const res = await fetch(url.toString())

    // ✅ handle bad HTTP responses
    if (!res.ok) {
      throw new Error(`Failed to fetch competitions: ${res.status}`)
    }

    const data = await res.json()

    // ✅ guard if data.docs isn’t what we expect
    if (!data?.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid competitions response format')
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Filter for today + future
    const upcomingComps = data.docs.filter((comp: any) => {
      if (!comp?.date) return false // guard against missing dates
      const compDate = new Date(comp.date)
      return !isNaN(compDate.getTime()) && compDate >= today
    })

    // Sort by closest first
    upcomingComps.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return upcomingComps
  } catch (error) {
    console.error('fetchComps error:', error)

    // ✅ Always return a safe fallback so UI doesn’t crash
    return []
  }
}
