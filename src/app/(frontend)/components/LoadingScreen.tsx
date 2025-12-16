'use client'

import { useEffect, useState } from 'react'

export default function LoadingOverlay({ loading }: { loading: boolean }) {
  const [show, setShow] = useState(loading)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!loading) {
      // Trigger fade-out animation
      setFade(true)
      const timeout = setTimeout(() => setShow(false), 800) // match CSS animation
      return () => clearTimeout(timeout)
    } else {
      setFade(false)
      setShow(true)
    }
  }, [loading])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-700 ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`relative w-32 h-32 ${fade ? 'fade-out' : ''}`}>
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white" style={{ animation: 'ping-slow 1s ease-in-out infinite' }}></div>
        {/* Middle Ring */}
        <div className="absolute inset-4 rounded-full border-4 border-white" style={{ animation: 'ping-slower 1s ease-in-out infinite' }}></div>
        {/* Inner Ring */}
        <div className="absolute inset-8 rounded-full border-4 border-white" style={{ animation: 'ping-slowest 1s ease-in-out infinite' }}></div>
      </div>
    </div>
  )
}
