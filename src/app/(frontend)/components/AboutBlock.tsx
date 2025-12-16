import Image from 'next/image'
import { Page } from '@/payload-types'
import SplitTabs from '@/components/SplitTabs/page'

type AboutProps = Extract<Page['content'][0], { blockType: 'about' }>

export default function AboutBlock({ block }: { block: AboutProps }) {
  return (
    <article className="py-28 pl-8 lg:pl-24 2xl:pl-41">
      <header className=" mb-5 grid grid-cols-[1fr_auto] pt-20 items-start gap-6 pr-8 lg:pr-24 2xl:pr-41">
        {/* Title + Subtitle */}
        <div className="pt-8 pb-3">
          <h1 className="text-4xl font-bold mb-4 italic">{block.maintitle}</h1>
          {block.subtitle && <p className="text-2xl text-black">{block.subtitle}</p>}
        </div>

        {/* Vertical gold line */}
        <div className="w-0.5 hidden lg:block bg-yellow h-full mr-[235px] 2xl:mr-[158px]" />
      </header>

      {/* Hero Image */}
      {block.heroImage?.url && (
        <div className="relative w-full aspect-video mb-5 overflow-hidden h-[650px]">
          <Image
            src={block.heroImage.url}
            alt={block.heroImage.alt || block.title}
            fill
            className="object-cover pr-8 lg:pr-24 2xl:pr-41"
          />
        </div>
      )}
      <SplitTabs content={block.content} />
    </article>
  )
}
