'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { fetchPosts } from '../utils/fetchPosts'
import { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type PostPreviewProps = Extract<Page['content'][0], { blockType: 'postsPreview' }>

export default function PostPreviewBlock({ block }: { block: PostPreviewProps }) {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts(block.limit).then(setPosts)
  }, [block.limit])

  return (
    <section className="py-12 pl-16">
      <div className='flex w-full justify-between items-center pr-16'>

      {block.maintitle && (
        <h2 className="text-3xl font-bold text-slate-900 mb-8">{block.maintitle}</h2>
      )}

      {block.cta && (
        <a href={block.cta.link} >
          <Button variant="plain">
          {block.cta.text}
          <ArrowRight/>
          </Button>
        </a>
      )}
      </div>

      <Carousel className="relative w-full">
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.id}>
              <a
                href={`/posts/${post.id}`}
                className="block w-full h-full overflow-hidden relative"
              >
                {post.heroImage && (
                  <div className="relative w-full h-full aspect-square z-0">
                    <Image
                      src={post.heroImage.url}
                      alt={post.heroImage.alt || 'Post image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10"></div>

                <div className="p-4 absolute bottom-0 left-0 z-20">
                  <h3 className="text-lg font-semibold text-white">{post.maintitle}</h3>
                  {post.subtitle && <p className="text-white text-sm mt-1">{post.subtitle}</p>}
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
