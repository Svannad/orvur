'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { fetchComps } from '../utils/fetchComps'

type CompProps = {
  maintitle: string
  limit?: number
}

export default function CompBlock({ block }: { block: CompProps }) {
  const [comps, setComps] = useState<any[]>([])

  useEffect(() => {
    fetchComps(block.limit).then(setComps)
  }, [block.limit])

  return (
    <section>
      <h2>{block.maintitle}</h2>
      <ul>
        {comps.map((comp) => (
          <li key={comp.id}>
            <h3>{comp.title}</h3>
            <p>Distance: {comp.distance}</p>
            <p>Date: {new Date(comp.date).toLocaleDateString()}</p>
            <p>Location: {comp.location}</p>
            <p>Time: {comp.time}</p>

            {/* render related teams */}
            {comp.teams && comp.teams.length > 0 && (
              <ul>
                {comp.teams.map((team: any) => (
                  <li key={team.id || team}>{typeof team === 'object' ? team.title : team}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
