'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function TabForm() {
  const { id } = useParams() as { id: string }
  const [form, setForm] = useState<any>(null)
  const [team, setTeam] = useState<any>(null)
  const [teamClosed, setTeamClosed] = useState<boolean | null>(null)
  const [formState, setFormState] = useState({
    loading: false,
    error: null,
    success: false,
  })

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch(`http://localhost:3000/api/teams/${id}`)
        const data = await res.json()

        setTeam(data)

        const isExpired = data.expirationDate && new Date(data.expirationDate) < new Date()

        setTeamClosed(isExpired || data.status === 'closed')
      } catch (err) {
        console.error(err)
      }
    }

    loadTeam()
  }, [id])

  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch('http://localhost:3000/api/forms/6920275f533f3f9f62188022?depth=2')
        const data = await res.json()
        setForm(data)
      } catch (err) {
        console.error(err)
      }
    }

    loadForm()
  }, [])

  if (!form) return <p>Loading form…</p>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return

    setFormState({ loading: true, error: null, success: false })

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      const response = await fetch(`/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      setFormState({ loading: false, error: null, success: true })
      ;(e.target as HTMLFormElement).reset()

      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 8000)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setFormState({ loading: false, error: 'Error submitting form', success: false })
    }
  }

  return (
    <>
      <h2 className='font-bold italic text-2xl mb-4'>Join Ørvur Today!</h2>
      <p className='mb-8'>
        Ready to start your archery journey? Fill out the form below and we’ll
        help you find the right team. Whether you’re a beginner or an experienced archer, we can’t
        wait to welcome you to our club!
      </p>

      {teamClosed ? (
        <p className="text-red font-semibold text-lg">Application Closed</p>
      ) : (
        <form
          action={`/api/form-submissions/${form.id}`}
          method="POST"
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
        >
         
          {formState.error && <p className="text-red">{formState.error}</p>}

          {formState.success ? (
            <div className="text-green-800 text-xl">
              <RichText data={form.confirmationMessage} />
            </div>
          ) : (
            <>
              {form.fields?.map((field: any) => (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={field.name} className="mb-2 font-semibold">
                    {field.label}
                  </label>

                  {/* TEXT INPUTS */}
                  {['text', 'email', 'number'].includes(field.blockType) && (
                    <Input
                      type={field.blockType === 'text' ? 'text' : field.blockType}
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      placeholder={field.label}
                    />
                  )}

                  {/* SELECT INPUT */}
                  {field.blockType === 'select' && (
                    <select
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      className="border border-blue p-2"
                    >
                      <option value="">Choose Team…</option>
                      {field.options?.map((opt: any) => (
                        <option key={opt.id} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
              <Button type="submit" variant="default" className='mt-4'>
                {form.submitButtonLabel}
              </Button>
            </>
          )}
        </form>
      )}
    </>
  )
}
