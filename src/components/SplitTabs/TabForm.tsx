'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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

        const isExpired =
          data.expirationDate &&
          new Date(data.expirationDate) < new Date()

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
      }, 5000)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setFormState({ loading: false, error: 'Error submitting form', success: false })
    }
  }

  return (
    <>
      <h2>{form.title}</h2>

      {teamClosed ? (
        <p className="text-red-600 font-semibold text-lg">Application Closed</p>
      ) : (
        <form
          action={`/api/form-submissions/${form.id}`}
          method="POST"
          className="flex flex-col gap-4 max-w-md"
          onSubmit={handleSubmit}
        >
          {form.fields?.map((field: any) => (
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.name} className="mb-1 font-semibold">
                {field.label}
              </label>

              {/* TEXT INPUTS */}
              {['text', 'email', 'number'].includes(field.blockType) && (
                <input
                  type={field.blockType === 'text' ? 'text' : field.blockType}
                  name={field.name}
                  id={field.name}
                  required={field.required}
                  className="border border-gray-300 p-2 rounded"
                />
              )}

              {/* SELECT INPUT */}
              {field.blockType === 'select' && (
                <select
                  name={field.name}
                  id={field.name}
                  required={field.required}
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="">Choose…</option>
                  {field.options?.map((opt: any) => (
                    <option key={opt.id} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          {formState.error && <p className="text-red-500">{formState.error}</p>}

          {formState.success ? (
            <div className="text-green-500">
              <RichText data={form.confirmationMessage} />
            </div>
          ) : (
            <button type="submit" className="bg-black text-white py-2">
              {form.submitButtonLabel}
            </button>
          )}
        </form>
      )}
    </>
  )
}
