'use client'

import { SearchResponse } from '@/apis/search/types/search'
import Loading from '@/app/search/image/loading'
import { useGetSearch } from '@/hooks/reactQuery/search/query'
import { AxiosResponse } from 'axios'
import Parser from 'html-react-parser'
import Link from 'next/link'
import { FC } from 'react'
import PaginationButtons from './PaginationButtons'

interface Props {
  q: string
  start?: string
  searchType?: 'image' | 'web'
}

const WebSearchResult: FC<Props> = ({ q, start, searchType = 'web' }) => {
  const { data: searchResult, isLoading } = useGetSearch({
    q,
    start,
    searchType,
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

  const { data } = searchResult as unknown as AxiosResponse
  const { searchInformation, items } = data as SearchResponse['getWeb']

  return (
    <div className='w-full mx-auto px-3 pb-36 sm:pb-24 sm:pl-[5%] md:pl-[14%] lg:pl-52'>
      <p className='text-gray-600 text-sm mb-5 mt-3'>
        About {searchInformation?.formattedTotalResults} results
        {searchInformation?.formattedSearchTime} seconds
      </p>
      {items.map((result) => (
        <div
          key={result.cacheId}
          className='mb-8 max-w-xl'>
          <div className='group flex flex-col'>
            <Link
              className='text-sm truncate'
              href={result.link}>
              {result.formattedUrl}
            </Link>
            <Link
              className='group-hover:underline decoration-blue-800 text-xl truncate font-medium text-blue-800'
              href={result.link}>
              {result.title}
            </Link>
          </div>
          <p className='text-gray-600'>{Parser(result.htmlSnippet)}</p>
        </div>
      ))}
      <PaginationButtons />
    </div>
  )
}
export default WebSearchResult
