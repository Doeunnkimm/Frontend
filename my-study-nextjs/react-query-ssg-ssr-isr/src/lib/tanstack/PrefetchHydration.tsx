import type { QueryFunction, QueryKey } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import { cache } from 'react'

import HydrateOnClient from './HydrateOnClient'

interface Props {
  queryKey: QueryKey
  queryFn: QueryFunction
}

export const PrefetchHydration: FC<PropsWithChildren<Props>> = async ({
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
