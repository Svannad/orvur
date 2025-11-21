'use client'

import { Page } from '@/payload-types'
import React, { useEffect, useState } from 'react'

type SubmitProps = Extract<Page['content'][0], { blockType: 'submit' }>

export default function SubmitBlock({ block }: { block: SubmitProps }) {
  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch('/api/form-submissions') // Payload collection endpoint
        const data = await res.json()
        setSubmissions(data.docs || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Form Submissions</h1>
      {submissions.length === 0 && <p>No submissions yet</p>}
      {submissions.map((sub) => (
        <div key={sub.id} style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem' }}>
          <pre>{JSON.stringify(sub, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}
