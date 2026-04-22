'use client'

import { useState } from 'react'

export default function InquiryForm() {
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    setError(false)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      business: formData.get('business') as string,
    }

    console.log('Submitting form data:', data)

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('Response status:', res.status)
      
      let result
      try {
        result = await res.json()
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        setMessage('Server error. Please try again.')
        setError(true)
        setSubmitting(false)
        return
      }

      console.log('Response data:', result)

      if (res.ok) {
        setMessage('Thank you. We will be in touch.')
        setError(false)
        form.reset()
      } else {
        setMessage(result.error || `Error: ${res.status}. Please try again.`)
        setError(true)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setMessage(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`)
      setError(true)
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input 
          type="text" 
          name="name"
          placeholder="Name"
          required
          className="w-full px-6 py-4 bg-black border border-amber-500/30 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors font-light"
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email"
          required
          className="w-full px-6 py-4 bg-black border border-amber-500/30 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors font-light"
        />
      </div>
      <input 
        type="text" 
        name="business"
        placeholder="Business name"
        required
        className="w-full px-6 py-4 bg-black border border-amber-500/30 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors font-light"
      />
      <button 
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto px-12 py-4 bg-white text-neutral-950 font-medium hover:bg-amber-500 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit inquiry'}
      </button>
      {message && (
        <p className={`text-sm mt-4 ${error ? 'text-red-500' : 'text-amber-500'}`}>
          {message}
        </p>
      )}
    </form>
  )
}