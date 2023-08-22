import { GET_FAKE_DATA } from '@/shared/constants'
import { FakeDataProps } from '@/types'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getFakeData } from '..'

export const useGetFakeData = (
  options?: UseQueryOptions<FakeDataProps[], AxiosError>
) => {
  return useQuery<FakeDataProps[], AxiosError>(
    [GET_FAKE_DATA],
    async () => await getFakeData(),
    {
      ...options,
    }
  )
}
