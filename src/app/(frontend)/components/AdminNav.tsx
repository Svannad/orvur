'use client'

import { File } from "lucide-react"

export default function AdminNav() {

  return (
    <a href="/applications" className="text-white bg-blue rounded-full text-5xl fixed bottom-24 right-24 z-50 shadow-lg">
      <File size={30} className="m-4" />
    </a>
  )
}
