// utils/fetchComps.ts
export const fetchComps = async (limit?: number) => {
  const url = new URL(`http://localhost:3000/api/competitions`);
  url.searchParams.append('depth', '1');
  if (limit) url.searchParams.append('limit', limit.toString());

  const res = await fetch(url.toString());
  const data = await res.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  // Filter for competitions that are today or in the future
  const upcomingComps = data.docs.filter((comp: any) => {
    const compDate = new Date(comp.date);
    return compDate >= today;
  });

  // Sort ascending by date (closest first)
  upcomingComps.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingComps;
};
