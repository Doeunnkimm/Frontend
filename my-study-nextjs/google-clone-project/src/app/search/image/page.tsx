import ImageSearchResult from '@/components/ImageSearchResult'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  searchParams: { searchTerm: string }
}
export interface DataProps {
  kind: string
  url: { type: string; template: string }
  searchInformation: {
    searchTime: number
    formattedSearchTime: string
    totalResults: string
    formattedTotalResults: string
  }
  items: ItemProps[]
}

export interface ItemProps {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  mime: string
  fileFormat: string
  image: ImageProps
}

interface ImageProps {
  contextLink: string
  height: number
  width: number
  byteSize: number
  thumbnailLink: string
  thumbnailHeight: number
  thumbnailWidth: number
}

const ImageSearchPage: FC<Props> = async ({ searchParams }) => {
  const response = fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&searchType=image`
  )

  if (!(await response).ok) {
    throw new Error('Something went wrong')
  }

  const data: DataProps = await (await response).json()
  const results = data.items

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

  return <>{data && <ImageSearchResult results={data} />}</>
}
export default ImageSearchPage
