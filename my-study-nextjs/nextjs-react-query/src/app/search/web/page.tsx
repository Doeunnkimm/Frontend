'use client'

import WebSearchResult from '@/components/WebSearchResult'
import { useGetSearch } from '@/hooks/reactQuery/search/query'
import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { FC } from 'react'
import { Props } from '../image/page'
import Loading from './loading'

const WebSearchPage: FC<Props> = ({ searchParams }) => {
  const start = searchParams.start || '1'
  const q = searchParams.searchTerm || ''
  const { data: searchResult, isLoading } = useGetSearch({
    q,
    start,
    searchType: 'image',
  })

  if (isLoading) return <Loading />

  if (!searchResult) {
    return (
      <div className='flex flex-col justify-center items-center pt-10'>
        <h1 className='text-3xl mb-4'>No results found</h1>
        <p className='text-lg'>
          Try searching for something else or go back to the homepage{' '}
          <Link
            href='/'
            className='text-blue-500'>
            Home
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      {searchResult && (
        <WebSearchResult
          results={(searchResult as unknown as AxiosResponse).data}
        />
      )}
    </>
  )
}
export default WebSearchPage
