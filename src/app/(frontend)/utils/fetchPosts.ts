// utils/fetchPosts.ts
export const fetchPosts = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/posts`);
  url.searchParams.append('sort', '-createdAt');
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};

export const fetchPostById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch post:", res.statusText);
    return null;
  }

  const data = await res.json();
  return data;
};


