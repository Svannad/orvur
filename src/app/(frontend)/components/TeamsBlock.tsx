'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { fetchTeams } from '../utils/fetchTeams'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type TeamsProps = Extract<Page['content'][0], { blockType: 'teamsOverview' }>

export default function TeamsBlock({ block }: { block: TeamsProps }) {
  const [teams, setTeams] = useState<any[]>([])
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
  async function load() {
    const result = await fetchTeams(block.limit)
    setTeams(result?.docs || result || [])
  }
  load()
}, [block.limit])


  return (
    <section className="px-41 py-32">
      <h1 className="text-4xl italic font-bold mb-12">{block.maintitle}</h1>
      <div className="flex gap-6 justify-center items-stretch overflow-hidden ">
        {teams.map((team, index) => {
          const expanded = hovered === index || (hovered === null && index === 0)

          return (
            <a
              key={team.id}
              href={`/teams/${team.id}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`team-item relative h-[700px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                expanded ? 'is-hovered' : ''
              }`}
            >
              {/* Image */}
              {team.image?.url ? (
                <Image src={team.image.url} alt={team.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-black/50" />
              )}

              {/* gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>

              {/* content */}
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-xl font-semibold mb-2">{team.title}</h3>

                {/* Only show subDescription when expanded */}
                {expanded && team.subDescription && (
                  <div className="text-sm text-white transition-opacity duration-300">
                    <RichText data={team.subDescription} />
                  </div>
                )}
              </div>

              {/* Status Pill */}
              {team.status && (
                <div className="absolute top-4 right-4 z-30 bg-yellow text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wider">
                  {team.status}
                </div>
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}
