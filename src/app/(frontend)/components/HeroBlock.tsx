import { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

export default function HeroBlock({block}: {block: Page['content'][0]}) {
    return (
        <div>
            <h1>{block.maintitle}</h1>
            <RichText data={block.subtitle}/>
            {block.image && (
                <Image src={block.image.url} alt={block.image.alt || 'Hero Image'} width={500} height={300} />
            )}
            {block.ctaText && (
                <a href={block.ctaText.link}>{block.ctaText.text}</a>
            )}
        </div>
    )
}