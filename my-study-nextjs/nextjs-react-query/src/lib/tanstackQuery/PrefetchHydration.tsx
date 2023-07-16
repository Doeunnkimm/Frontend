import {
  QueryClient,
  QueryFunction,
  QueryKey,
  dehydrate,
} from '@tanstack/react-query'
import { FC, PropsWithChildren, cache } from 'react'

import HydrateOnClient from './hydrateOnClient'

interface Props {
  queryKey: QueryKey
  queryFn: QueryFunction
}

const PrefetchHydration: FC<PropsWithChildren<Props>> = async ({
  queryKey,
  queryFn,
  children,
}) => {
  const getQueryClient = cache(() => new QueryClient())
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(queryKey, queryFn)
  const dehydratedState = dehydrate(queryClient)

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>
}

export default PrefetchHydration
