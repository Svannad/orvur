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
    fetchTeams(block.limit).then(setTeams)
  }, [block.limit])

  return (
    <section className="py-12 px-8 max-w-7xl mx-auto">
      {block.maintitle && (
        <h2 className="text-3xl font-bold text-center mb-10">{block.maintitle}</h2>
      )}

      <div className="flex gap-6 justify-center items-stretch overflow-hidden">
        {teams.map((team, index) => (
          <a
            key={team.id}
            href={`/teams/${team.id}`}
                    onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`team-item relative h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ease-in-out ${hovered === index ? 'is-hovered' : ''}`}
          >
              {/* Background image or fallback */}
              {team.image?.url ? (
                <Image
                  src={team.image.url}
                  alt={team.title}
                  fill
                  className="object-cover brightness-75"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-100" />
              )}

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>

              {/* content */}
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                <h3 className="text-xl font-semibold mb-2">{team.title}</h3>
                {team.subDescription && (
                  <div className="text-sm text-gray-200">
                    <RichText data={team.subDescription} />
                  </div>
                )}
              </div>

          </a>
        ))}
      </div>
    </section>
  )
}
