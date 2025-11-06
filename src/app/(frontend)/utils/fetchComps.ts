// utils/fetchComps.ts
export const fetchComps = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/competitions`);
  url.searchParams.append('depth', '1');
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};
