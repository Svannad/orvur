const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

// utils/fetchPageBySlug.ts
export async function fetchPageBySlug(slug: string) {
  try {
    const url = `${baseUrl}/api/pages?where[slug][equals]=${slug}`
    console.log('Fetching:', url)

    const res = await fetch(url, {
      cache: 'no-store',
    })

    // ✅ Handle HTTP errors
    if (!res.ok) {
      throw new Error(`Failed to fetch page "${slug}": ${res.status}`)
    }

    const data = await res.json()

    // ✅ Validate structure
    if (!data?.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid page response format')
    }

    return data.docs[0] || null
  } catch (error) {
    console.error('fetchPageBySlug error:', error)

    // ✅ Safe fallback so UI never crashes
    return null
  }
}
