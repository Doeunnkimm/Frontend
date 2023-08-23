import { getPostList } from '@/apis'
import { posts } from '@/mocks/fixture'

describe('/apis', () => {
  it('getPostList() - 함수 호출 시, 게시글 목록을 받아옵니다.', async () => {
    const { server } = await import('../mocks/server')
    server.listen({ onUnhandledRequest: 'warn' }) // 응답이 없는 경우 warning

    // Given, When
    const res = await getPostList()

    // Then
    expect(res).toStrictEqual(posts)
  })
})
