import '../globals.css'

import Footer from '@/components/Footer'
import SearchHeader from '@/components/SearchHeader'
import type { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Google clone Next js 13',
  description: 'Google clone Next js 13',
}

interface Props {
  children: React.ReactNode
}

const SearchLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <SearchHeader />
      {children}
      <Footer />
    </div>
  )
}
export default SearchLayout
