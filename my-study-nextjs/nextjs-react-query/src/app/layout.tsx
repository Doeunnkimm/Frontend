import './globals.css'

import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Provider from './Provider'

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
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  )
}
