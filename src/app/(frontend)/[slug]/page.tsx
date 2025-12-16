import { PageProps } from ".next/types/app/(frontend)/layout"
import RenderBlocks from "../components/RenderBlocks"
import { fetchPageBySlug } from "../utils/fetchPageBySlug"


export default async function Page({ params }: { params: PageProps["params"] }) {
  const page = await fetchPageBySlug(params.slug)

  if (!page) {
    return <div className="p-8 text-center">404 - Page not found</div>
  }

  return (
    <main>
      <RenderBlocks blocks={page.content || []} />
    </main>
  )
}
