// utils/fetchPosts.ts
export const fetchPosts = async (limit?: number) => {
  try {
    const url = new URL('http://localhost:3000/api/posts')
    url.searchParams.append('sort', '-createdAt')
    if (limit) url.searchParams.append('limit', limit.toString())

    const res = await fetch(url.toString())

    // ✅ handle bad HTTP status
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const data = await res.json()

    // ✅ validate structure
    if (!data?.docs || !Array.isArray(data.docs)) {
      throw new Error('Invalid posts response format')
    }

    return data.docs
  } catch (error) {
    console.error('fetchPosts error:', error)

    // ✅ safe fallback
    return []
  }
}

export const fetchPostById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: 'no-store',
    })

    // ✅ handle HTTP error
    if (!res.ok) {
      throw new Error(`Failed to fetch post ${id}: ${res.status}`)
    }

    const data = await res.json()

    // ✅ basic validation
    if (!data) {
      throw new Error('Empty post response')
    }

    return data
  } catch (error) {
    console.error('fetchPostById error:', error)

    // ✅ safe fallback
    return null
  }
}
