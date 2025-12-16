import { Block } from "payload";

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'maintitle',
      type: 'text',
      required: true,
    },
    {
        name: 'subtitle',
        type: 'richText',
        required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'cta',
      type: 'group',
      required: false,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
        },
        {
          name: 'link',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}