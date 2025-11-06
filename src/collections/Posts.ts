import { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [
    {
      name: "maintitle",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: 'media',
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "imageGallery",
      type: "upload",
      relationTo: 'media',
      hasMany: true,
      required: false,
    }
  ],
};

export default Posts;