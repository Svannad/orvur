import { Button } from '@/components/ui/button'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

import Image from 'next/image'

type HeroProps = Extract<Page['content'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <section className="relative w-full h-[85vh] flex items-end text-white overflow-hidden">
      {/* Background Image */}
      {block.image && (
        <Image
          src={block.image.url}
          alt={block.image.alt || 'Hero Image'}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"></div>

      {/* Text + Button Container */}
      <div className="relative z-10 py-8 px-8 lg:px-24 2xl:px-41 max-w-2xl 2xl:max-w-4xl">
        <h1 className="text-4xl font-bold italic mb-4">{block.maintitle}</h1>

        <div className="mb-6">
          <RichText data={block.subtitle} />
        </div>

        {block.cta && (
          <a href={block.cta.link}>
            <Button variant="default">{block.cta.text}</Button>
          </a>
        )}
      </div>
    </section>
  )
}
