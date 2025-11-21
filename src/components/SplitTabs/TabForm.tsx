'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function TabForm() {
  const [form, setForm] = useState<any>(null)
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:3000/api/forms/6920275f533f3f9f62188022?depth=2')

        const data = await res.json()
        setForm(data)
      } catch (err) {
        console.error(err)
      }
    }

    load()
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
    </>
  )
}
