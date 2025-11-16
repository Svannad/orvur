import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page } from '@/payload-types'

type AboutProps = Extract<Page['content'][0], { blockType: 'about' }>

export default function AboutBlock({ block }: { block: AboutProps }) {
  return (
    <article className="py-64 pl-41">
      <header className="mb-12 grid grid-cols-[1fr_auto] pt-20 items-start gap-6 pr-41">
        {/* Title + Subtitle */}
        <div>
          <h1 className="text-4xl font-bold mb-4 italic">{block.title}</h1>
          {block.subtitle && <p className="text-2xl text-black">{block.subtitle}</p>}
        </div>

        {/* Vertical gold line */}
        <div className="w-0.5 bg-yellow h-full mr-[250px]" />
      </header>

      {/* Hero Image */}
      {block.heroImage?.url && (
        <div className="relative w-full aspect-video mb-10 overflow-hidden h-[750px]">
          <Image
            src={block.heroImage.url}
            alt={block.heroImage.alt || block.title}
            fill
            className="object-cover pr-41"
          />
        </div>
      )}
      <div className="grid grid-cols-[1fr_auto_200px] gap-6 mb-12 items-start pr-41 min-h-[50vh]">
        {/* Left: Content */}
        {block.content && (
          <div className="prose prose-lg">
            <RichText data={block.content} />
          </div>
        )}

        {/* Middle: Vertical gold line */}
        <div className="w-0.5 bg-yellow h-full mr-[250px]" />
      </div>
    </article>
  )
}
