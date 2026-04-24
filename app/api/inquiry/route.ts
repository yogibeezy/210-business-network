export const runtime = 'nodejs'
export const maxDuration = 30

import axios from 'axios'

export async function GET() {
  return new Response(
    JSON.stringify({ status: 'API is working' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, business, phone = '' } = body

    if (!name || !email || !business) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const GC_API_KEY = process.env.GLOBALCONTROL_API_KEY || ''
    if (!GC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const firstName = name.split(' ')[0] || ''
    const lastName = name.split(' ').slice(1).join(' ') || ''
    
    // Create axios instance with default headers
    const gcApi = axios.create({
      baseURL: 'https://api.globalcontrol.io/api/ai',
      headers: {
        'X-API-KEY': GC_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    // Step 1: Create contact
    const createRes = await gcApi.post('/contacts', {
      email: email,
      firstName: firstName,
      lastName: lastName,
      name: name,
      phone: phone
    })

    const contactId = createRes.data.data?._id || createRes.data.data?.id

    if (!contactId) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you. We will be in touch.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Step 2: Wait for GC to process
    await delay(2000)

    // Step 3: Update contact with tags using axios
    const tagRes = await gcApi.put(`/contacts/${contactId}`, {
      tags: ['69e8b46f80a5749c2a3f6f0a', '69e8b47580a5749c2a3f7071']
    })

    const hasTags = tagRes.data.data?.tags?.length === 2

    // Step 4: Update custom fields
    await gcApi.put(`/contacts/${contactId}`, {
      customFields: [
        { key: 'businessName', value: business },
        { key: 'source', value: '210 Business Network Website' },
        { key: 'inquiryDate', value: new Date().toISOString() }
      ]
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you. We will be in touch.',
        contactId: contactId,
        hasTags: hasTags
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('API error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}