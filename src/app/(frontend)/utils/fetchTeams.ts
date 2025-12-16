const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || '';

export const fetchTeams = async (limit?: number) => {
  const url = new URL(`${baseUrl}/api/teams`);
  url.searchParams.append;
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();
  return data.docs;
};
