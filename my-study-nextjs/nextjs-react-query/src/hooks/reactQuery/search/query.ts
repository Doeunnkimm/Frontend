import SearchApi, {
  SearchParams,
  SearchResponseTypes,
} from '@/apis/search/search.api'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { SEARCH_KEY } from '@/shared/constants/queryKeys'
import { AxiosError } from 'axios'

export const useGetSearch = (
  params: SearchParams['get'],
  options?: UseQueryOptions<SearchResponseTypes, AxiosError>
) => {
  return useQuery<SearchResponseTypes, AxiosError>(
    SEARCH_KEY.detail([{ ...params }]),
    () => SearchApi.get(params),
    {
      ...options,
    }
  )
}
