import '../globals.css'

import Footer from '@/components/Footer'
import SearchHeader from '@/components/SearchHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google clone Next js 13',
  description: 'Google clone Next js 13',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SearchHeader />
      {children}
      <Footer />
    </div>
  )
}
