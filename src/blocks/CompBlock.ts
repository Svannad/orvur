import { Block } from "payload";

export const CompBlock: Block = {
  slug: "compOverview",
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

export default CompBlock;