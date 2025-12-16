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

  const defaultTab = 'content'

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      {/* Container: grid on lg+, flex-col on smaller screens */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_300px] gap-8 items-start min-h-[50vh]">

        {/* TOP TABS FOR SMALL SCREENS */}
        <div className="flex lg:hidden flex-row gap-2 mb-4 overflow-x-auto">
          <TabsList className="flex flex-row gap-2">
            {allowedTabs.content && (
              <TabsTrigger value="content">{isPost && author ? author : 'About'}</TabsTrigger>
            )}
            {allowedTabs.form && <TabsTrigger value="form">Application Form</TabsTrigger>}
            {allowedTabs.location && <TabsTrigger value="location">Location</TabsTrigger>}
            {allowedTabs.table && <TabsTrigger value="table">Competitions</TabsTrigger>}
            {allowedTabs.accordion && <TabsTrigger value="accordion">FAQ</TabsTrigger>}
          </TabsList>
        </div>

        {/* LEFT CONTENT AREA */}
        <div className="prose prose-lg max-w-none pt-8 pb-24 pr-8 lg:pr-0 overflow-x-auto w-full">
          <div className="min-w-[300px]">
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
        </div>

        {/* MIDDLE LINE */}
        {/* Horizontal line on small screens, vertical on lg+ */}
        <div className="bg-yellow hidden lg:block w-0.5 h-full mx-auto my-0" />

        {/* RIGHT SIDE TABS (vertical) */}
        <div className="hidden lg:flex flex-col gap-4 pt-8">
          <TabsList className="flex flex-col gap-2 bg-transparent p-0 h-auto">
            {allowedTabs.content && (
              <TabsTrigger value="content" className="w-full justify-start">
                {isPost && author ? author : 'About'}
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
