import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function TabAccordion() {
  return (
    <>
      <h2>Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>What is Ørvur known for?</AccordionTrigger>
          <AccordionContent>
            We are known for timeless craftsmanship rooted in Nordic tradition…
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>Where are your products made?</AccordionTrigger>
          <AccordionContent>
            All products are designed and handcrafted in the Faroe Islands…
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
