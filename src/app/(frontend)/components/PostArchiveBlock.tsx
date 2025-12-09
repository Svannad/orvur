'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchPosts } from '../utils/fetchPosts'
import { Page } from '@/payload-types'
import { Search } from 'lucide-react'
import { serializeLexicalRichText } from '../utils/serializeRichText'
import { Skeleton } from '@/components/ui/skeleton'

type PostArchiveProps = Extract<Page['content'][0], { blockType: 'postsArchive' }>

export default function PostArchiveBlock({ block }: { block: PostArchiveProps }) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPosts(block.limit).then((fetched) => {
      const withPlainText = fetched.map((post: any) => ({
        ...post,
        _plainContent: serializeLexicalRichText(post.content || []),
      }))
      setPosts(withPlainText)
      setLoading(false)
    })
  }, [block.limit])

  const filteredPosts = posts.filter((post) => {
    const q = search.toLowerCase()

    return (
      post.maintitle?.toLowerCase().includes(q) ||
      post.subtitle?.toLowerCase().includes(q) ||
      post.author?.toLowerCase().includes(q) ||
      post._plainContent?.toLowerCase().includes(q)
    )
  })

  return (
    <section className="px-8 lg:px-24 2xl:px-41 py-41">
      {/* HEADER ROW */}
      <div className="flex items-center justify-between mb-12">
        {block.maintitle && <h1 className="text-4xl italic font-bold">{block.maintitle}</h1>}

        {/* Search */}
        <div className="flex items-center bg-blue border border-blue cursor-pointer">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 w-64 bg-white focus:outline-none"
          />
          <Search color="white" size={20} className="mx-3" />
        </div>
      </div>

      {/* Gold line */}
      <div className="w-full h-0.5 bg-yellow mb-12"></div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 🟦 Show skeletons before posts load */}
        {loading &&
          Array.from({ length: block.limit || 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-md" />
          ))}

        {/* 🟨 Show real posts when loaded */}
        {!loading &&
          filteredPosts.map((post) => (
            <a
              key={post.id}
              href={`/posts/${post.id}`}
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

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10"></div>

              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-lg font-semibold text-white">{post.maintitle}</h3>
                {post.subtitle && <p className="text-white text-sm mt-1">{post.subtitle}</p>}
                {post.author && <p className="text-white text-xs mt-1">By {post.author}</p>}
              </div>
            </a>
          ))}
      </div>

      {!loading && filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      )}
    </section>
  )
}
