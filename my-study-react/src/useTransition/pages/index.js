import { Suspense, useState, useTransition } from 'react'
import PostListPage from './List'

const TransitionPage = () => {
  const [page, setPage] = useState(1)
  const [isPending, startTransition] = useTransition()

  const onMovePage = (state) => {
    startTransition(() => {
      if (state === 'prev') {
        setPage((prev) => prev - 1)
      }

      if (state === 'next') {
        setPage((prev) => prev + 1)
      }
    })
  }
  return (
    <Suspense fallback={<h1>로딩중입니다~~</h1>}>
      <PostListPage
        page={page}
        onMovePage={onMovePage}
      />
    </Suspense>
  )
}

export default TransitionPage
