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
  const data: Promise<DataProps> = (await response).json()
  const results = (await data).items

  return (
    <>
      {results &&
        results.map((result) => <h1 key={result.cacheId}>{result.title}</h1>)}
    </>
  )
}
export default WebSearchPage
