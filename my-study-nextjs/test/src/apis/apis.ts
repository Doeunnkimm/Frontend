import { PostProps } from '@/types'
import axios from 'axios'

export const getPostList = async () => {
  const res = await axios.get<PostProps[]>(
    'https://jsonplaceholder.typicode.com/posts'
  )
  return res.data
}
