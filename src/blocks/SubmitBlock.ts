import { Block } from 'payload'

export const SubmitBlock: Block = {
  slug: 'submit',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
