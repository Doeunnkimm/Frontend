'use client'

import { SearchResponse } from '@/apis/search/types/search'
import Loading from '@/app/search/image/loading'
import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { FC } from 'react'
import PaginationButtons from './PaginationButtons'
/* eslint-disable @next/next/no-img-element */
import { useGetSearch } from '@/hooks/reactQuery/search/query'

interface Props {
  q: string
  start?: string
  searchType?: 'image' | 'web'
}

const ImageSearchResult: FC<Props> = ({ q, start, searchType = 'web' }) => {
  const { data: searchResult, isLoading } = useGetSearch({
    q,
    start,
    searchType: 'image',
  })

  if (isLoading) return <Loading />

  console.log(searchResult)

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
  const { items } = data as SearchResponse['getImage']

  return (
    <div className='sm:pb-24 pb-40 mt-4'>
      <div className='grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 px-3 space-x-4'>
        {items.map((result) => (
          <div
            key={result.link}
            className='mb-8'>
            <div className='group'>
              <Link href={result.image.contextLink}>
                <img
                  src={result.link}
                  alt={result.title}
                  className='h-60 group-hover:shadow-xl w-full object-contain transition-shadow'
                />
              </Link>
              <Link href={result.image.contextLink}>
                <h2 className='group-hover:underline truncate text-xl'>
                  {result.title}
                </h2>
              </Link>
              <Link href={result.image.contextLink}>
                <p className='group-hover:underline text-gray-600'>
                  {result.displayLink}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='ml-16'>
        <PaginationButtons />
      </div>
    </div>
  )
}
export default ImageSearchResult
