# 210 Business Network

Where South Texas Business Happens

## Overview

The network for San Antonio and South Texas business owners, operators, and builders.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Global Control CRM Integration

## Environment Variables

```
GLOBALCONTROL_API_KEY=your_api_key_here
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Routes

- `/api/inquiry` - POST endpoint for contact form submissions
  - Creates contact in Global Control CRM
  - Applies tags and custom fields
  - Returns success/error status

## Deployment

Deployed on Vercel with automatic GitHub integration.