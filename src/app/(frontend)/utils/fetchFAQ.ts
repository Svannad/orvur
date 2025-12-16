export async function fetchFAQ() {
  const res = await fetch(`http://localhost:3000//api/faq?limit=100`, {
    cache: "no-store",
  })

  const data = await res.json()
  return data.docs
}
