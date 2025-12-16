'use client'

import { fetchFAQ } from '@/app/(frontend)/utils/fetchFAQ'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'


export default function TabAccordion() {
const [FAQs, setFAQs] = useState<any[]>([])

   useEffect(() => {
    fetchFAQ().then((data) => {
      setFAQs(data)
    })
  }, [])

  return (
    <>
      <h2>Frequently Asked Questions</h2>

      <Accordion type="single" collapsible>
        {FAQs?.map((item: any, i: number) => (
          <AccordionItem key={i} value={`q-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>

            <AccordionContent>
              <RichText data={item.answer} />
              {item.link?.text && item.link?.link && (
                <a
                  href={item.link.link}
                  className="text-blue-600 underline mt-2 block"
                >
                  {item.link.text}
                </a>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
