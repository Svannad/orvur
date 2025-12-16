export async function fetchNavigation() {
  const res = await fetch('http://localhost:3000/api/globals/navigation', {
    cache: 'no-store',
  })
  
  if (!res.ok) return null
  
  return await res.json()
}