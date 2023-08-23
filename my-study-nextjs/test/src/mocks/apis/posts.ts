import type { PostProps } from '@/types'
import { rest } from 'msw'
import { posts } from '../fixture'

/**
 * 게시물 목록 조회
 */
export const getPostList = rest.get(
  'https://jsonplaceholder.typicode.com/posts',
  (_, res, ctx) => {
    return res(ctx.json<PostProps[]>(posts))
  }
)
