'use client'

import { useEffect, useState } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import { Page } from '@/payload-types'

type PostArchiveProps = Extract<Page['content'][0], { blockType: 'postsArchive' }>

export default function PostArchiveBlock({ block }: { block: PostArchiveProps }) {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts(block.limit).then(setPosts)
  }, [block.limit])

  return (
    <section>
      <h2>{block.maintitle}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.maintitle}</h3>
            <p>{post.subtitle}</p>
            <p>By {post.author}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
