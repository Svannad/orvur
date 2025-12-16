
export async function fetchNavigation() {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

  
  try {
    const res = await fetch(`${baseUrl}/api/globals/navigation`, {
      cache: 'no-store',
    })

    // ✅ Handle bad responses
    if (!res.ok) {
      throw new Error(`Failed to fetch navigation: ${res.status}`)
    }

    const data = await res.json()

    // ✅ Optional: validate structure
    if (!data) {
      throw new Error('Navigation response was empty')
    }

    return data
  } catch (error) {
    console.error('fetchNavigation error:', error)

    // ✅ Safe fallback so UI doesn’t break
    return null
  }
}
