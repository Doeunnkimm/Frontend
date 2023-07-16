import './globals.css'

import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google clone Next js 13',
  description: 'Google clone Next js 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='relative min-h-screen'>
        {children}
        <Footer />
      </body>
    </html>
  )
}
