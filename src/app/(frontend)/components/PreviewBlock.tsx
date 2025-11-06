import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type PreviewProps = Extract<Page['content'][0], { blockType: 'hero' }>

export default function PreviewBlock({ block }: { block: PreviewProps }) {
  return (
    <div>
      <h1>{block.maintitle}</h1>
      <h2>{block.subtitle}</h2>
      <RichText data={block.description} />
      {block.image && (
        <Image
          src={block.image.url}
          alt={block.image.alt || 'Hero Image'}
          width={500}
          height={300}
        />
      )}
      {block.cta && <a href={block.cta.link}>{block.cta.text}</a>}
    </div>
  )
}