import { DataProps } from '@/app/search/web/page'
import Parser from 'html-react-parser'
import Link from 'next/link'
import { FC } from 'react'
import PaginationButtons from './PaginationButtons'

interface Props {
  results: DataProps
}

const WebSearchResult: FC<Props> = ({ results }) => {
  const { searchInformation, items } = results

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
