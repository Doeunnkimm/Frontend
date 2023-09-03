import { useQuery } from 'react-query'
import { getPostList } from '../apis/apis'

const PostListPage = ({ page, onMovePage }) => {
  const { data: postList } = useQuery(
    ['posts', page],
    async () => await getPostList({ _page: page }),
    {
      suspense: true,
    }
  )

  return (
    <div>
      <div>
        <button onClick={() => onMovePage('prev')}>⬅️ 이전</button>
        <button onClick={() => onMovePage('next')}>➡️ 다음</button>
      </div>
      {postList.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  )
}

export default PostListPage
