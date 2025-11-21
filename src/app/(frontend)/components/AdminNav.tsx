'use client'
import React, { useEffect, useState } from 'react'

export default function AdminNav() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/users/me')
        if (!res.ok) return setIsAdmin(false)

        const user = await res.json()
        if (user?.role === 'admin') setIsAdmin(true)
      } catch {
        setIsAdmin(false)
      }
    }

    checkAdmin()
  }, [])

  if (!isAdmin) return null

  return (
    <a href="/admin-only-page" className="text-black text-5xl fixed bottom-24 right-24 z-50">
      Admin Page
    </a>
  )
}
