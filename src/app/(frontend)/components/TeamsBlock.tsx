'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { fetchTeams } from '../utils/fetchTeams'
import { RichText } from '@payloadcms/richtext-lexical/react'

type TeamsProps = Extract<Page['content'][0], { blockType: 'teamsOverview' }>

export default function TeamsBlock({ block }: { block: TeamsProps }) {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    fetchTeams(block.limit).then(setTeams)
  }, [block.limit])

  return (
    <section>
      <h2>{block.maintitle}</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h3>{team.title}</h3>
            <RichText data={team.subDescription} />
          </li>
        ))}
      </ul>
    </section>
  )
}
