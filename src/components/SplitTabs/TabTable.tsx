'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchComps } from '@/app/(frontend)/utils/fetchComps'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function CompetitionTableWithFilter() {
  const pathname = usePathname()

  const [comps, setComps] = useState<any[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchComps().then((data) => setComps(data))
  }, [])

  // Extract unique team names after fetch
  const allTeams = Array.from(
    new Set(comps.flatMap((comp) => comp.teams?.map((team: any) => team.title) || [])),
  )

  // Detect if we are on a team page: /teams/[slug]
  useEffect(() => {
    if (!comps.length) return // wait for fetch

    const isTeamPage = pathname.startsWith('/teams/')

    if (isTeamPage) {
      const slug = pathname.replace('/teams/', '')

      // Find matching team title by slug
      const matchingTeam = comps
        .flatMap((comp) => comp.teams || [])
        .find((team: any) => team.slug === slug)

      if (matchingTeam) {
        setSelectedTeam(matchingTeam.title)
      }
    } else {
      // About page OR anything else → show all by default
      setSelectedTeam('')
    }
  }, [pathname, comps])

  // Filter competitions
  const filteredComps =
    selectedTeam === ''
      ? comps
      : comps.filter((comp) => comp.teams?.some((team: any) => team.title === selectedTeam))

  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-2xl font-bold italic">Competitions</h2>

      {/* TEAM COMBOBOX */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            {selectedTeam || 'Filter by team...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search team..." className="h-9" />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  value=""
                  onSelect={() => {
                    setSelectedTeam('')
                    setOpen(false)
                  }}
                >
                  All Teams
                  <Check
                    className={cn('ml-auto', selectedTeam === '' ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>

                {allTeams.map((team) => (
                  <CommandItem
                    key={team}
                    value={team}
                    onSelect={(val) => {
                      setSelectedTeam(val === selectedTeam ? '' : val)
                      setOpen(false)
                    }}
                  >
                    {team}
                    <Check
                      className={cn('ml-auto', selectedTeam === team ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Teams</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredComps.map((comp) => (
            <TableRow key={comp.id}>
              <TableCell>{comp.title}</TableCell>
              <TableCell>{comp.distance}</TableCell>
              <TableCell>{new Date(comp.date).toLocaleDateString('da-DK')}</TableCell>
              <TableCell>{comp.location}</TableCell>
              <TableCell>{comp.time}</TableCell>
              <TableCell>
                {comp.teams?.length ? comp.teams.map((t: any) => t.title).join(', ') : '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
