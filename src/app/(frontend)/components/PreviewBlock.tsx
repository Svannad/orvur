'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { fetchPosts } from '../utils/fetchPosts'
import { Button } from '@/components/ui/button'

type PreviewProps = {
  mode: 'auto' | 'manual'
  maintitle?: string
  subtitle?: string
  description?: any[]
  image?: {
    url: string
    alt?: string
  }
  cta?: {
    text: string
    link: string
  }
  post?: any
}

export default function PreviewBlock({ block }: { block: PreviewProps }) {
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (block.mode === 'auto') {
        const posts = await fetchPosts(1)
        setPost(posts[0])
      } else if (block.post) {
        setPost(block.post)
      }
    }
    loadPost()
  }, [block.mode, block.post])

  if (!post && block.mode === 'auto') return null

  const image = block.mode === 'manual' ? block.image : post?.heroImage

  const createdDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <section className="w-full flex flex-col lg:flex-row items-center gap-12 py-12 px-8 lg:px-24 2xl:px-41 min-h-[50vh]">
      {/* Image Section */}
      {image && (
        <div className="relative w-full lg:w-1/2 aspect-4/3 overflow-hidden">
          <Image src={image.url} alt={image.alt || 'Preview Image'} fill className="object-cover" />
        </div>
      )}

      {/* Text Section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl italic font-bold">{block.maintitle || post?.maintitle}</h1>

          <h2 className="text-2xl font-bold">{block.subtitle || post?.subtitle}</h2>

          {createdDate && <p className="text-black/50">{createdDate}</p>}
        </div>

        <div className="leading-relaxed text-xl line-clamp-5">
          <RichText data={block.description || post?.content} />
        </div>

        {block.mode === 'manual' ? (
          block.cta && (
            <a href={block.cta.link}>
              <Button variant="secondary">{block.cta.text}</Button>
            </a>
          )
        ) : (
          <a href={`/posts/${post?.id}`}>
            <Button variant="default">Read more</Button>
          </a>
        )}
      </div>
    </section>
  )
}
