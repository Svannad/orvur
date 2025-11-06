import CompBlock from '@/blocks/CompBlock';
import { HeroBlock } from '@/blocks/HeroBlock';
import { PostArchiveBlock } from '@/blocks/PostArchiveBlock';
import { PreviewBlock } from '@/blocks/PreviewBlock';
import TeamsBlock from '@/blocks/TeamsBlock';
import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
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
        blocks: [HeroBlock, PreviewBlock, PostArchiveBlock, TeamsBlock, CompBlock],
        required: false,
    }
  ],
};

export default Pages;