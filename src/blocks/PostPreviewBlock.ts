import { Block } from "payload";

export const PostPreviewBlock: Block = {
  slug: "postPreview",
  fields: [
    {
      name: "maintitle",
      type: "text",
      required: true,
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
    {
      name: "limit",
      type: "number",
      required: false,
      defaultValue: 10,
    },
  ],
};