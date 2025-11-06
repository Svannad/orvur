import { HeroBlock } from '@/blocks/HeroBlock';
import { PreviewBlock } from '@/blocks/PreviewBlock';
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
        blocks: [HeroBlock, PreviewBlock],
        required: false,
    }
  ],
};

export default Pages;