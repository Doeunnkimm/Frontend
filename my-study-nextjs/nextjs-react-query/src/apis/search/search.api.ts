import Instance from '..'
import { SearchResponse } from './types/search'

const PATH = `/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}`

export interface SearchParams {
  get: {
    q: string
    searchType?: 'web' | 'image'
    start?: string
  }
}
export type SearchResponseTypes =
  | SearchResponse['getWeb']
  | SearchResponse['getImage']

const SearchApi = {
  get: async (params: SearchParams['get']) =>
    await Instance.get<SearchResponseTypes, SearchResponseTypes>(PATH, {
      params,
    }),
}

export default SearchApi
