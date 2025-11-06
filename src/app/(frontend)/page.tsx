import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import './styles.css'
import HeroBlock from './components/HeroBlock'
import { Page } from '@/payload-types'
import PreviewBlock from './components/PreviewBlock'
import PostArchiveBlock from './components/PostArchiveBlock'
import TeamsBlock from './components/TeamsBlock'
import CompBlock from './components/CompBlock'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [page],  } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'landingpage',
      },
    },
  });

  if (!page) {
    return <div>Page not found</div>
  }

  const renderBlocks = (block: Page['content'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id}/>
      case 'preview':
        return <PreviewBlock block={block} key={block.id}/>
      case 'postArchive':
        return <PostArchiveBlock block={block} key={block.id}/>
      case 'teamsOverview':
        return <TeamsBlock block={block} key={block.id}/>
      case 'compOverview':
        return <CompBlock block={block} key={block.id}/>
      default:
        return null
    }
  }

  return (
  <div>
    <h1>{page.title}</h1>
    <div>
      {page.content?.map((block) => renderBlocks(block))}
    </div>
  </div>
)

}
