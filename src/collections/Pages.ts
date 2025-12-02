
import AboutBlock from '@/blocks/AboutBlock'
import CompBlock from '@/blocks/CompBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { PostArchiveBlock } from '@/blocks/PostArchiveBlock'
import { PostPreviewBlock } from '@/blocks/PostPreviewBlock'
import { PreviewBlock } from '@/blocks/PreviewBlock'
import { SubmitBlock } from '@/blocks/SubmitBlock'
import TeamsBlock from '@/blocks/TeamsBlock'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [HeroBlock, PreviewBlock, PostArchiveBlock, TeamsBlock, CompBlock, PostPreviewBlock, AboutBlock, SubmitBlock],
      required: false,
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
}

export default Pages
