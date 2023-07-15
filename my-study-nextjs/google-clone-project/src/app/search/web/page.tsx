import Link from 'next/link'
import { FC } from 'react'

interface Props {
  searchParams: { searchTerm: string }
}

interface DataProps {
  items: ItemProp[]
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
  htmlFormattedUrl: string
  pagemap: { metatage: Object[] }
}

const WebSearchPage: FC<Props> = async ({ searchParams }) => {
  console.log({ searchParams })
  const response = fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}`
  )

  if (!(await response).ok) {
    throw new Error('Something went wrong')
  }

  const data: Promise<DataProps> = (await response).json()
  const results = (await data).items

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

  return (
    <>
      {results &&
        results.map((result) => <h1 key={result.cacheId}>{result.title}</h1>)}
    </>
  )
}
export default WebSearchPage
