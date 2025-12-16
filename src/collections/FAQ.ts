import { CollectionConfig } from 'payload'

const FAQ: CollectionConfig = {
  slug: 'faq',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'link',
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

export default FAQ
