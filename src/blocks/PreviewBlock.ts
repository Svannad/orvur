import {Block} from "payload";

export const PreviewBlock: Block = {
  slug: 'preview',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'maintitle',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
        name: 'description',
        type: 'richText',
        required: true,
    },
    {
        name: 'cta',
        type: 'group',
        required: true,
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
          {
            name: 'link',
            type: 'text',
            required: true,
          },
        ],
    }
  ],
}