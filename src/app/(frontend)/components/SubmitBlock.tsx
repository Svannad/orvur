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
      className="border border-black/10 shadow-sm p-4 rounded-md"
    >
      {submission.submissionData?.map((item: any) => (
        <div key={item.id} className="flex gap-2 mb-1">
          <strong className="capitalize">{item.field}:</strong>
          <span>{item.value || '—'}</span>
        </div>
      ))}
    </div>
  )

  const TEAM_ORDER = ['Child', 'Kadet', 'Adult'] 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Applications Overview</h1>

      <Tabs defaultValue="Child" className="w-full">
        <TabsList className="bg-gray-100 rounded-md p-1 mb-6">
          {TEAM_ORDER.map((team) => (
            <TabsTrigger key={team} value={team}>
              {team}
            </TabsTrigger>
          ))}
        </TabsList>

        {TEAM_ORDER.map((team) => {
          const { main, waiting } = splitSubmissions(team)

          return (
            <TabsContent key={team} value={team} className="space-y-10">
              <section>
                <h2 className="text-xl font-semibold mb-3">
                  Main List ({main.length})
                </h2>

                {main.length === 0 ? (
                  <p>No submissions yet.</p>
                ) : (
                  <div className="space-y-3">
                    {main.map(renderSubmission)}
                  </div>
                )}
              </section>
              <section>
                <h2 className="text-xl font-semibold text-orange-600 mb-3">
                  Waiting List ({waiting.length})
                </h2>

                {waiting.length === 0 ? (
                  <p>No one on the waiting list.</p>
                ) : (
                  <div className="space-y-3">
                    {waiting.map(renderSubmission)}
                  </div>
                )}
              </section>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
