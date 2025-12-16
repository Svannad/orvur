import { Block } from "payload";

export const TeamsBlock: Block = {
  slug: "teamsOverview",
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
      defaultValue: 5,
    },
  ],
};

export default TeamsBlock;