'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { fetchTeams } from '../utils/fetchTeams'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

function TeamSkeleton() {
  return (
    <div className="relative h-[700px] w-full overflow-hidden rounded-md">
      <div className="absolute inset-0 bg-accent animate-pulse" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 z-20">
        <div className="h-6 w-32 bg-white/30 rounded-md animate-pulse mb-3"></div>
        <div className="h-4 w-48 bg-white/20 rounded-md animate-pulse"></div>
      </div>
      <div className="absolute top-4 right-4 bg-white/30 h-6 w-20 rounded-full animate-pulse" />
    </div>
  )
}

type TeamsProps = Extract<Page['content'][0], { blockType: 'teamsOverview' }>

export default function TeamsBlock({ block }: { block: TeamsProps }) {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const result = await fetchTeams(block.limit)
      setTeams(result?.docs || result || [])
      setLoading(false)
    }
    load()
  }, [block.limit])

  return (
    <section className="px-24 2xl:px-41 py-41">
      {block.maintitle && <h1 className="text-4xl italic font-bold mb-12">{block.maintitle}</h1>}

      <div className="flex gap-6 justify-center items-stretch overflow-hidden">
        {/* Skeletons */}
        {loading &&
          Array.from({ length: block.limit || 3 }).map((_, i) => <TeamSkeleton key={i} />)}

        {/* Real content */}
        {!loading && teams.length > 0 ? (
          teams.map((team, index) => {
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
                {team.image?.url ? (
                  <Image src={team.image.url} alt={team.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-black/50" />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                  <h3 className="text-xl font-semibold mb-2">{team.title}</h3>
                  {expanded && team.subDescription && (
                    <div className="text-sm text-white transition-opacity duration-300">
                      <RichText data={team.subDescription} />
                    </div>
                  )}
                </div>

                {team.status && (
                  <div className="absolute top-4 right-4 z-30 bg-yellow text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wider">
                    {team.status}
                  </div>
                )}
              </a>
            )
          })
        ) : (
          // Empty state
          !loading && (
            <div className="w-full text-center py-10 text-gray-500">
              No teams found.
            </div>
          )
        )}
      </div>
    </section>
  )
}
