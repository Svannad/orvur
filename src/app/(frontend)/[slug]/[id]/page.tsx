import Image from 'next/image'
import { fetchPostById } from '../../utils/fetchPosts'
import { fetchTeamById } from '../../utils/fetchTeams'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import SplitTabs from '@/components/SplitTabs/page'

export default async function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = params

  let data: any = null

  // Fetch depending on slug
  if (slug === 'posts') {
    data = await fetchPostById(id)
  } else if (slug === 'teams') {
    data = await fetchTeamById(id)
  }

  if (!data) {
    return <div className="p-8 text-center">404 - Page not found</div>
  }

  // For posts we have maintitle/subtitle, for teams maybe title/description
  const title = data.maintitle || data.title
  const subtitle = data.subtitle
  const author = data.author
  const heroImage = data.heroImage || data.image
  const content = data.content || data.mainDescription
  const gallery = data.imageGallery || []

  return (
    <article className="py-28 pl-41">
      <header className=" mb-5 grid grid-cols-[1fr_auto] pt-20 items-start gap-6 pr-41">
        {/* Title + Subtitle */}
        <div className="pt-8 pb-3">
          <h1 className="text-4xl font-bold mb-4 italic">{title}</h1>
          {subtitle && <p className="text-2xl text-black">{subtitle}</p>}
        </div>

        {/* Vertical gold line */}
        <div className="w-0.5 bg-yellow h-full mr-[158px]" />
      </header>

      {/* Hero Image */}
      {heroImage?.url && (
        <div className="relative w-full aspect-video mb-5 overflow-hidden h-[650px]">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || title}
            fill
            className="object-cover pr-41"
          />
        </div>
      )}
      <SplitTabs author={author} content={content} />

      {/* Image Gallery */}
      {gallery.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More Images</h2>

          <Carousel className="relative w-full">
            <CarouselContent>
              {gallery.map((image: any, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-full aspect-square z-0">
                    <Image src={image.url} alt={image.alt || title} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}
    </article>
  )
}
