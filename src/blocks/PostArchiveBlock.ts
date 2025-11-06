import { Block } from "payload";

export const PostArchiveBlock: Block = {
  slug: "postArchive",
  fields: [
    {
      name: "maintitle",
      type: "text",
      required: true,
    },
    {
      name: "limit",
      type: "number",
      required: false,
      defaultValue: 10,
    },
  ],
};