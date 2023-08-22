import { PrefetchHydration } from '@/lib/tanstack/PrefetchHydration'
import { GET_FAKE_DATA } from '@/shared/constants'
import PostList from './_components/List'
import { getFakeData } from './_state/server'

const PostsPage = () => {
  return (
    <>
      <PrefetchHydration
        queryKey={[GET_FAKE_DATA]}
        queryFn={() => getFakeData()}>
        <PostList />
      </PrefetchHydration>
    </>
  )
}

export default PostsPage
