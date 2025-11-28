'use client'

import React, { useEffect, useState } from 'react'
import { Page } from '@/payload-types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fetchTeams } from '../utils/fetchTeams'

type SubmitProps = Extract<Page['content'][0], { blockType: 'submit' }>

export default function SubmitBlock({ block }: { block: SubmitProps }) {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/form-submissions')
        const subsData = await res.json()
        const teamsData = await fetchTeams()

        setSubmissions(subsData.docs || [])
        setTeams(teamsData || [])
      } catch (error) {
        console.error('Error loading submissions or teams:', error)
      }
    }

    load()
  }, [])

  const getTeamValue = (s: any) =>
    s.submissionData?.find((f: any) => f.field === 'team')?.value

  const splitSubmissions = (teamTitle: string) => {
    const teamConfig = teams.find((t) => t.title === teamTitle)
    const capacity = teamConfig?.capacity || 0

    const teamSubs = submissions
      .filter((s) => getTeamValue(s) === teamTitle)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    return {
      main: teamSubs.slice(0, capacity),
      waiting: teamSubs.slice(capacity),
    }
  }

  const renderSubmission = (submission: any) => (
    <div
      key={submission.id}
      className="border border-yellow/40 shadow-sm p-4 rounded-lg hover:shadow-md transition-shadow duration-200 bg-yellow/10"
    >
      {submission.submissionData?.map((item: any) => (
        <div key={item.id} className="flex gap-2 mb-1">
          <strong className="capitalize text-gray-700">{item.field}:</strong>
          <span className="text-gray-600">{item.value || '—'}</span>
        </div>
      ))}
    </div>
  )

  const TEAM_ORDER = ['Child', 'Kadet', 'Adult']

  return (
    <div className="py-28 px-41">
      <h1 className="text-4xl font-bold mb-8 text-black italic">Applications Overview</h1>

      <Tabs defaultValue="Child" className="w-full">
        {/* Tabs styled as file tabs */}
        <TabsList className="flex space-x-2 mb-6">
          {TEAM_ORDER.map((team) => (
            <TabsTrigger
              key={team}
              value={team}
              className="
                relative 
                text-lg font-medium
                py-2 px-4
                bg-yellow/20 
                rounded-t-lg 
                shadow-sm 
                hover:bg-yellow/30 
                data-[state=active]:bg-white
                data-[state=active]:shadow-none
                data-[state=active]:border-b-2
                data-[state=active]:border-yellow
                transition-all
              "
            >
              {team}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content */}
        {TEAM_ORDER.map((team) => {
          const { main, waiting } = splitSubmissions(team)

          return (
            <TabsContent key={team} value={team} className="space-y-10">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-black border-b border-yellow/30 pb-2">
                  Main List ({main.length})
                </h2>

                {main.length === 0 ? (
                  <p className="text-black/50">No submissions yet.</p>
                ) : (
                  <div className="space-y-3">{main.map(renderSubmission)}</div>
                )}
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-red mb-4 border-b border-yellow/30 pb-2">
                  Waiting List ({waiting.length})
                </h2>

                {waiting.length === 0 ? (
                  <p className="text-black/50">No one on the waiting list.</p>
                ) : (
                  <div className="space-y-3">{waiting.map(renderSubmission)}</div>
                )}
              </section>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
