'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import TabContent from './TabContent'
import TabForm from './TabForm'
import TabLocation from './TabLocation'
import TabTable from './TabTable'
import TabAccordion from './TabAccordion'
import { usePathname } from 'next/navigation'

export default function SplitTabs({ author, content }: { author?: string; content?: any }) {
  const pathname = usePathname()

  const isPost = pathname.startsWith('/posts/')
  const isTeam = pathname.startsWith('/teams/')
  const isAbout = pathname === '/about'

  const allowedTabs = {
    content: isPost || isTeam || isAbout,
    form: isTeam,
    location: isAbout,
    table: isTeam || isAbout,
    accordion: isTeam || isAbout,
  }

  const defaultTab = "content"

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="grid grid-cols-[1fr_auto_300px] gap-8 items-start min-h-[50vh]">

        {/* LEFT CONTENT AREA */}
        <div className="prose prose-lg max-w-none pt-8 pb-24">
          {allowedTabs.content && (
            <TabsContent value="content">
              <TabContent content={content} />
            </TabsContent>
          )}

          {allowedTabs.form && (
            <TabsContent value="form">
              <TabForm />
            </TabsContent>
          )}

          {allowedTabs.location && (
            <TabsContent value="location">
              <TabLocation />
            </TabsContent>
          )}

          {allowedTabs.table && (
            <TabsContent value="table">
              <TabTable />
            </TabsContent>
          )}

          {allowedTabs.accordion && (
            <TabsContent value="accordion">
              <TabAccordion />
            </TabsContent>
          )}
        </div>

        {/* MIDDLE LINE */}
        <div className="w-0.5 bg-yellow h-full mx-auto" />

        {/* RIGHT SIDE TABS */}
        <div className="flex flex-col gap-4 pt-8">
          <TabsList className="flex flex-col gap-2 bg-transparent p-0 h-auto">

            {allowedTabs.content && (
              <TabsTrigger
                value="content"
                className="w-full justify-start"
              >
                {isPost && author ?  author : "About"}
              </TabsTrigger>
            )}

            {allowedTabs.form && (
              <TabsTrigger value="form" className="w-full justify-start">
                Application Form
              </TabsTrigger>
            )}

            {allowedTabs.location && (
              <TabsTrigger value="location" className="w-full justify-start ">
                Location
              </TabsTrigger>
            )}

            {allowedTabs.table && (
              <TabsTrigger value="table" className="w-full justify-start">
                Competitions
              </TabsTrigger>
            )}

            {allowedTabs.accordion && (
              <TabsTrigger value="accordion" className="w-full justify-start ">
                FAQ
              </TabsTrigger>
            )}
          </TabsList>
        </div>
      </div>
    </Tabs>
  )
}
