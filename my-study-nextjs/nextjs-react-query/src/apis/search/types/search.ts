interface ItemProps {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
}

interface ImageItemProps extends ItemProps {
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

interface WebItemProp extends ItemProps {
  cacheId: string
  formattedUrl: string
  htmlSnippet: string
  htmlFormattedUrl: string
  pagemap: { metatage: Object[] }
}

interface InformationProps {
  searchTime: number
  formattedSearchTime: string
  totalResults: string
  formattedTotalResults: string
}

export interface SearchResponse {
  getWeb: {
    items: WebItemProp[]
    searchInformation: InformationProps
  }
  getImage: {
    kind: string
    url: { type: string; template: string }
    searchInformation: InformationProps
    items: ImageItemProps[]
  }
}
