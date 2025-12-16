const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export const fetchPosts = async (limit?: number) => {
  const url = new URL(`${baseUrl}/api/posts`);
  url.searchParams.append('sort', '-createdAt');
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};

export const fetchPostById = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch post:", res.statusText);
    return null;
  }

  const data = await res.json();
  return data;
};


