import SearchApi from '@/apis/search/search.api'
import ImageSearchResult from '@/components/ImageSearchResult'
import PrefetchHydration from '@/lib/tanstackQuery/PrefetchHydration'
import { SEARCH_KEY } from '@/shared/constants/queryKeys'
import { FC } from 'react'

export interface Props {
  searchParams: {
    searchTerm: string
    start?: string
    searchType?: 'image' | 'web'
  }
}

const ImageSearchPage: FC<Props> = ({ searchParams }) => {
  const start = searchParams.start || '1'
  const q = searchParams.searchTerm || ''
  const searchType = searchParams.searchType || 'web'

  const params = { start, q, searchType }

  return (
    <PrefetchHydration
      queryKey={SEARCH_KEY.detail([{ ...params }])}
      queryFn={() => SearchApi.get(params)}>
      <ImageSearchResult
        start={start}
        q={q}
      />
    </PrefetchHydration>
  )
}
export default ImageSearchPage
