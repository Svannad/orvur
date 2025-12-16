import Image from 'next/image'
import { fetchPostById } from '../../utils/fetchPosts'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function Page({ params }: {
  params: Record<string, string>;
}) {
  const post = await fetchPostById(params.id)

  if (!post) {
    return <div className="p-8 text-center">404 - Post not found</div>
  }

  return (
    <article className="p-8 max-w-5xl mx-auto">
      {/* Title and subtitle */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.maintitle}</h1>
        {post.subtitle && (
          <h2 className="text-xl text-gray-600 mb-4">{post.subtitle}</h2>
        )}
        <p className="text-sm text-gray-500">By {post.author}</p>
      </header>

      {/* Hero Image */}
      {post.heroImage?.url && (
        <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.heroImage.url}
            alt={post.heroImage.alt || post.maintitle}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Post content */}
      <div className="prose prose-lg max-w-none mb-12">
        <RichText data={post.content} />
      </div>

      {/* Image Gallery */}
      {post.imageGallery?.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-6">Image Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {post.imageGallery.map((image: any, index: number) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl group"
              >
                <Image
                  src={image.url}
                  alt={image.alt || post.maintitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay like carousel */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
