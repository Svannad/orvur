import AboutBlock from './AboutBlock'
import CompBlock from './CompBlock'
import HeroBlock from './HeroBlock'
import PostArchiveBlock from './PostArchiveBlock'
import PostPreviewBlock from './PostPreviewBlock'
import PreviewBlock from './PreviewBlock'
import TeamsBlock from './TeamsBlock'

const blockComponents: any = {
  hero: HeroBlock,
  preview: PreviewBlock,
  teamsOverview: TeamsBlock,
  compBlock: CompBlock,
  postArchive: PostArchiveBlock,
  postPreview: PostPreviewBlock,
  about: AboutBlock,
}

export default function RenderBlocks({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks?.map((block, i) => {
        const BlockComponent = blockComponents[block.blockType]
        if (!BlockComponent) return null
        return <BlockComponent key={i} block={block} />
      })}
    </>
  )
}
