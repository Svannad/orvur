import { CollectionConfig } from 'payload'

export const Competitions: CollectionConfig = {
  slug: 'competitions',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'distance',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'teams',
      type: 'relationship',
      relationTo: 'teams',
      hasMany: true,
    },
  ],
}

export default Competitions;
