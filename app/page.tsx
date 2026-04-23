'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Thank you. We will be in touch.')
        setFormData({ name: '', email: '', phone: '', business: '' })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            210 Business Network
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-4">
            Where South Texas Business Happens
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            The network for San Antonio and South Texas business owners, operators, and builders. 
            Connect with the people who make things happen.
          </p>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="px-6 py-16 lg:px-8 border-t border-gray-800">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-semibold text-center mb-2">Join the Network</h2>
          <p className="text-gray-400 text-center mb-8">
            Get connected with South Texas business leaders
          </p>

          {status === 'success' ? (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 text-center">
              <p className="text-green-400 font-medium">{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-gray-400 hover:text-white underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500"
                  placeholder="(210) 555-1234"
                />
              </div>

              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-300 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="business"
                  required
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your Company LLC"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'submitting' ? 'Submitting...' : 'Join the Network'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
          © 2026 210 Business Network. All rights reserved.
        </div>
      </footer>
    </main>
  )
}