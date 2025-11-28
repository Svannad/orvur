import { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
  slug: 'teams',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'mainDescription', type: 'richText', required: true },
    { name: 'subDescription', type: 'richText', required: true },
    { name: 'capacity', type: 'number', required: true },
    { name: 'prize', type: 'number', required: true },
    {
      name: 'expirationDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
    },
  ],
  admin: {
    useAsTitle: 'title',
  },

  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc) return doc

        const now = new Date()
        const expiration = new Date(doc.expirationDate)

        return {
          ...doc,
          status: expiration < now ? 'closed' : 'open',
        }
      },
    ],
  },
}


export default Teams
