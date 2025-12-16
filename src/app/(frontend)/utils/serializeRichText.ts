export function serializeLexicalRichText(richText: any): string {
  if (!richText) return ""

  try {
    return JSON.stringify(richText)
      .replace(/<[^>]+>/g, '') 
      .replace(/[{[\]},"]/g, ' ') 
      .replace(/\s+/g, ' ')
      .trim()
  } catch {
    return ""
  }
}
