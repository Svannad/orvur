// utils/fetchPosts.ts
export const fetchPosts = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/posts`);
  url.searchParams.append('sort', '-createdAt');
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};
