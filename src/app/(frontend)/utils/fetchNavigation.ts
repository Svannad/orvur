const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export async function fetchNavigation() {
  const res = await fetch(`${baseUrl}/api/globals/navigation`, {
    cache: 'no-store',
  })
  
  if (!res.ok) return null
  
  return await res.json()
}