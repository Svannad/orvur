// utils/fetchFAQ.ts
export async function fetchFAQ() {
  try {
    const res = await fetch(`http://localhost:3000/api/faq?limit=100`, {
      cache: 'no-store',
    })

    // ✅ Handle failed HTTP response
    if (!res.ok) {
      throw new Error(`Failed to fetch FAQ: ${res.status}`)
    }

    const data = await res.json()

    // ✅ Validate expected structure
    if (!data?.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid FAQ response format')
    }

    return data.docs
  } catch (error) {
    console.error('fetchFAQ error:', error)

    // ✅ Always return a safe fallback
    return []
  }
}
