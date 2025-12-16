const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export async function fetchPageBySlug(slug: string) {
  try {
    const url = `${baseUrl}/api/pages?where[slug][equals]=${slug}`
    console.log('Fetching:', url)

    const res = await fetch(url, {
      cache: 'no-store',
    })

    console.log('Response status:', res.status)

    if (!res.ok) {
      console.error('Fetch failed:', res.status, res.statusText)
      return null
    }

    const data = await res.json()
    console.log('Response data:', data)
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}
