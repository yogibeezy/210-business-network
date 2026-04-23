export const runtime = 'nodejs'
export const maxDuration = 30

export async function GET() {
  return new Response(
    JSON.stringify({ status: 'API is working' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

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
    
    // Step 1: Create contact
    const createRes = await fetch('https://api.globalcontrol.io/api/ai/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': GC_API_KEY
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        name: name,
        phone: phone
      })
    })

    if (!createRes.ok) {
      return new Response(
        JSON.stringify({ error: `Global Control error: ${createRes.status}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const createData = await createRes.json()
    const contactId = createData.data?._id || createData.data?.id

    if (!contactId) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you. We will be in touch.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Step 2: Update contact with tags (THIS WORKS - proven above)
    await fetch(`https://api.globalcontrol.io/api/ai/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': GC_API_KEY
      },
      body: JSON.stringify({
        tags: ['69e8b46f80a5749c2a3f6f0a', '69e8b47580a5749c2a3f7071']
      })
    })

    // Step 3: Update custom fields separately
    await fetch(`https://api.globalcontrol.io/api/ai/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': GC_API_KEY
      },
      body: JSON.stringify({
        customFields: [
          { key: 'businessName', value: business },
          { key: 'source', value: '210 Business Network Website' },
          { key: 'inquiryDate', value: new Date().toISOString() }
        ]
      })
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you. We will be in touch.',
        contactId: contactId
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