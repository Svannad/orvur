'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchPosts } from '../utils/fetchPosts'
import { Page } from '@/payload-types'

type PostArchiveProps = Extract<Page['content'][0], { blockType: 'postsArchive' }>

export default function PostArchiveBlock({ block }: { block: PostArchiveProps }) {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts(block.limit).then(setPosts)
  }, [block.limit])

  return (
    <section className="py-12 px-16">
      <div className="grid grid-cols-3 gap-8">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/${post.slug}/${post.id}`}
            className="relative block w-full overflow-hidden group"
          >
            {post.heroImage && (
              <div className="relative w-full aspect-square">
                <Image
                  src={post.heroImage.url}
                  alt={post.heroImage.alt || 'Post image'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10"></div>

            {/* Text content */}
            <div className="absolute bottom-0 left-0 p-4 z-20">
              <h3 className="text-lg font-semibold text-white">{post.maintitle}</h3>
              {post.subtitle && <p className="text-white text-sm mt-1">{post.subtitle}</p>}
              {post.author && <p className="text-white text-xs mt-1">By {post.author}</p>}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
