import { FakeDataProps } from '@/types'
import axios from 'axios'

export const getFakeData = async () => {
  const { data } = await axios.get<FakeDataProps[]>(
    'https://jsonplaceholder.typicode.com/posts'
  )
  return data
}
