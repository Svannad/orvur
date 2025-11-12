import Image from 'next/image'
import { fetchPostById } from '../../utils/fetchPosts'
import { fetchTeamById } from '../../utils/fetchTeams'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function Page({
  params,
}: {
  params: { slug: string; id: string }
}) {
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
    <article className="p-8 max-w-5xl mx-auto">
      {/* Title and subtitle */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <div className="text-xl text-gray-600 mb-4">
            <RichText data={subtitle} />
          </div>
        )}
        {author && <p className="text-sm text-gray-500">By {author}</p>}
      </header>

      {/* Hero Image */}
      {heroImage?.url && (
        <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      {content && (
        <div className="prose prose-lg max-w-none mb-12">
          <RichText data={content} />
        </div>
      )}

      {/* Image Gallery */}
      {gallery.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-6">Image Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((image: any, index: number) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl group"
              >
                <Image
                  src={image.url}
                  alt={image.alt || title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
