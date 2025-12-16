import RenderBlocks from "../components/RenderBlocks"
import { fetchPageBySlug } from "../utils/fetchPageBySlug"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await fetchPageBySlug(slug)

  if (!page) {
    return <div className="p-8 text-center">404 - Page not found</div>
  }

  return (
    <main>
      <RenderBlocks blocks={page.content || []} />
    </main>
  )
}
