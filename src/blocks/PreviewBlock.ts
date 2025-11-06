import { Block } from 'payload'

export const PreviewBlock: Block = {
  slug: 'preview',
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'auto',
      options: [
        { label: 'Auto (show newest post)', value: 'auto' },
        { label: 'Manual (custom preview)', value: 'manual' },
      ],
    },
    {
      name: 'maintitle',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        // check both data and siblingData so the condition works while editing
        condition: (data, siblingData) => (data?.mode ?? siblingData?.mode) === 'manual',
      },
    },
    {
      name: 'cta',
      type: 'group',
      required: false,
      fields: [
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
      admin: {
        condition: (data, siblingData) => (data?.mode ?? siblingData?.mode) === 'manual',
      },
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: false,
      admin: {
        condition: (data, siblingData) => (data?.mode ?? siblingData?.mode) === 'manual',
        description: 'Select a post manually (only used in manual mode).',
      },
    },
  ],
}

export default PreviewBlock
