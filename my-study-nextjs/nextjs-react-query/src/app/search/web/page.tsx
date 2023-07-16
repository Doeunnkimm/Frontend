import WebSearchResult from '@/components/WebSearchResult'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  searchParams: { searchTerm: string; start: string }
}
export interface DataProps {
  items: ItemProp[]
  searchInformation: SearchInformationProps
}

interface ItemProp {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  cacheId: string
  formattedUrl: string
  htmlSnippet: string
  htmlFormattedUrl: string
  pagemap: { metatage: Object[] }
}

interface SearchInformationProps {
  searchTime: number
  formattedSearchTime: string
  totalResults: string
  formattedTotalResults: string
}

const WebSearchPage: FC<Props> = async ({ searchParams }) => {
  const start = searchParams.start || '1'
  const response = fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&start=${start}`
  )

  if (!(await response).ok) {
    throw new Error('Something went wrong')
  }

  const data: DataProps = await (await response).json()
  const results = data.items

  console.dir(data)
  if (!results) {
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

  return <>{data && <WebSearchResult results={data} />}</>
}
export default WebSearchPage
