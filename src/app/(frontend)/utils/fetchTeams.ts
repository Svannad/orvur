// utils/fetchPosts.ts
export const fetchTeams = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/teams`);
  url.searchParams.append;
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};
