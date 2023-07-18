import SearchApi from '@/apis/search/search.api'
import WebSearchResult from '@/components/WebSearchResult'
import PrefetchHydration from '@/lib/tanstackQuery/PrefetchHydration'
import { SEARCH_KEY } from '@/shared/constants/queryKeys'
import { FC } from 'react'
import { Props } from '../image/page'

const WebSearchPage: FC<Props> = ({ searchParams }) => {
  const start = searchParams.start || '1'
  const q = searchParams.searchTerm || ''
  const searchType = searchParams.searchType || 'web'

  const params = { start, q, searchType }
  return (
    <PrefetchHydration
      queryKey={SEARCH_KEY.detail([{ ...params }])}
      queryFn={() => SearchApi.get(params)}>
      <WebSearchResult
        q={q}
        start={start}
        searchType={searchType}
      />
    </PrefetchHydration>
  )
}
export default WebSearchPage
