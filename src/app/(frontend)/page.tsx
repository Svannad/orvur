import React from 'react'
import './styles.css'
import { fetchPageBySlug } from './utils/fetchPageBySlug'
import RenderBlocks from './components/RenderBlocks'
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper'

export default async function HomePage() {
  const page = await fetchPageBySlug('home')
  
  return (
    <AnimatedPageWrapper>
      {page ? <RenderBlocks blocks={page.content} /> : <div>No homepage found</div>}
    </AnimatedPageWrapper>
  )
}
