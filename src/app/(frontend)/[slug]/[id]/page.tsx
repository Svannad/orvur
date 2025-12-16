import Image from 'next/image'
import { fetchPostById } from '../../utils/fetchPosts'
import { fetchTeamById } from '../../utils/fetchTeams'
import SplitTabs from '@/components/SplitTabs/page'
import ImageGallery from '@/components/ImageGallery'

type PageProps = {
  params: Promise<{ slug: string; id: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug, id } = await params

  let data: any = null

  if (slug === 'posts') {
    data = await fetchPostById(id)
  } else if (slug === 'teams') {
    data = await fetchTeamById(id)
  }

  if (!data) {
    return <div className="p-8 text-center">404 - Page not found</div>
  }

  const title = data.maintitle || data.title
  const subtitle = data.subtitle
  const author = data.author
  const heroImage = data.heroImage || data.image
  const content = data.content || data.mainDescription
  const gallery = data.imageGallery || []

  return (
    <article className="py-28 pl-8 lg:pl-24 2xl:pl-41 w-full">
      <header className=" mb-5 grid grid-cols-[1fr_auto] pt-20 items-start gap-6 pr-8 lg:pr-24 2xl:pr-41">
        {/* Title + Subtitle */}
        <div className="pt-8 pb-3">
          <h1 className="text-4xl font-bold mb-4 italic">{title}</h1>
          {subtitle && <h2 className="text-2xl text-black">{subtitle}</h2>}
        </div>

        {/* Vertical gold line */}
        <div className="w-0.5 hidden lg:block bg-yellow h-full mr-[235px] 2xl:mr-[158px]" />
      </header>

      {/* Hero Image */}
      {heroImage?.url && (
        <div className="relative w-full aspect-video mb-5 overflow-hidden h-[650px]">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || title}
            fill
            className="object-cover pr-8 lg:pr-24 2xl:pr-41"
          />
        </div>
      )}
      <SplitTabs author={author} content={content} />

      <ImageGallery gallery={gallery} />
    </article>
  )
}
