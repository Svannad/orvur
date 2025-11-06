'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { fetchPosts } from '../utils/fetchPosts'

type PreviewProps = Extract<Page['content'][0], { blockType: 'preview' }>

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

  return (
    <div>
      <h1>{block.maintitle || post?.maintitle}</h1>
      <h2>{block.subtitle || post?.subtitle}</h2>

      <RichText data={block.description || post?.content} />

      {block.mode === 'manual' ? (
        block.image && (
          <Image
            src={block.image.url}
            alt={block.image.alt || 'Preview Image'}
            width={500}
            height={300}
          />
        )
      ) : (
        post?.heroImage && (
          <Image
            src={post.heroImage.url}
            alt={post.heroImage.alt || 'Post Image'}
            width={500}
            height={300}
          />
        )
      )}

      {block.mode === 'manual' ? (
        block.cta && <a href={block.cta.link}>{block.cta.text}</a>
      ) : (
        <a href={`/posts/${post?.id}`}>Read more</a>
      )}
    </div>
  )
}
