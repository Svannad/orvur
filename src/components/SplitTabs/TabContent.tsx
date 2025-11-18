import { RichText } from "@payloadcms/richtext-lexical/react";

export default function TabContent({ content }: { content?: any }) {
  return (
    <>
      <RichText data={content} />
    </>
  )
}
