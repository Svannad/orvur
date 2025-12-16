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
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

export default function TabAccordion() {
  const [FAQs, setFAQs] = useState<any[]>([])

  useEffect(() => {
    fetchFAQ().then((data) => {
      setFAQs(data)
    })
  }, [])

  return (
    <>
      <h2 className="text-2xl font-bold italic mb-8">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible>
        {FAQs?.map((item: any, i: number) => (
          <AccordionItem key={i} value={`q-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>

            <AccordionContent>
              <RichText data={item.answer} />
              {item.link?.text && item.link?.link && (
                <a href={item.link.link}>
                  <Button variant="plain" size="plain" className="mt-4">
                    {item.link.text}
                    <ArrowRight />
                  </Button>
                </a>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
