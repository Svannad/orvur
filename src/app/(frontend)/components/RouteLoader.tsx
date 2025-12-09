// components/ClientWrapper.tsx
'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <LoadingScreen loading={loading} />
      <div className={loading ? 'pointer-events-none' : ''}>{children}</div>
    </>
  )
}
