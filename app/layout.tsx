import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '210 Business Network | Where South Texas Business Happens',
  description: 'The network for San Antonio and South Texas business owners, operators, and builders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  )
}