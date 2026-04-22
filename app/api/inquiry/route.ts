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
    const { name, email, business } = body

    if (!name || !email || !business) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const GC_API_KEY = 'a5934d6c63f5d021e4d85164945d144fbefeaf6298938c02ba2655acb093379c'
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
        name: name
      })
    })

    if (!createRes.ok) {
      const errorText = await createRes.text()
      return new Response(
        JSON.stringify({ error: `Global Control error: ${createRes.status} - ${errorText}` }),
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

    // Step 2: Update contact with tags
    const updateRes = await fetch(`https://api.globalcontrol.io/api/ai/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': GC_API_KEY
      },
      body: JSON.stringify({
        tags: ['69e8b46f80a5749c2a3f6f0a', '69e8b47580a5749c2a3f7071'],
        customFields: [
          { key: 'businessName', value: business },
          { key: 'source', value: '210 Business Network Website' },
          { key: 'inquiryDate', value: new Date().toISOString() }
        ]
      })
    })

    const updateData = await updateRes.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you. We will be in touch.',
        contactId: contactId,
        tagsApplied: updateRes.ok
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('API error:', error)
    return new Response(
      JSON.stringify({ error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown'}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}