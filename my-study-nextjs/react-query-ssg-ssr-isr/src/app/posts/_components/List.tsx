'use client'

import { useGetFakeData } from '../_state/server/queries'

const PostList = () => {
  const { data: posts } = useGetFakeData()

  return (
    <>
      <h1>{new Date().toISOString()}</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <div>{post.body}</div>
          </div>
        ))}
    </>
  )
}

export default PostList
