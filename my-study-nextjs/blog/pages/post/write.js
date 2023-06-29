import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Write() {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.stringify(router))
    }
    // next/link가 없는 탐색에서 유용
    // 미리 페이지를 가져오도록 할 수 있다.
    router.prefetch('/posts/ssg-ssr')
  }, [router])

  useEffect(() => {
    // 라우터가 동작하기 전에 무언가 작업하고 싶을 때
    router.beforePopState((state) => {
      // 바뀐 주소를 원상태로 되돌리도록
      // pushState는 popState 이벤트를 발생X, 주소만 추가
      window.history.pushState(null, '', router.asPath) // asPath는 어디로부터 왔는지 그 주소
      if (confirm('안녕하세요')) {
        router.beforePopState(() => true)
        router.back()
      }
      return false
    })
  }, [])

  useEffect(() => {
    /**
     * query가 존재해도
     * 정적 페이지는 hydration 이전에는 빈 객체를 보여주고
     * 그 이후에는 query 값을 보여준다.
     */
    console.log(router.query)
  }, [router.query])

  const idRef = useRef(undefined)
  const titleRef = useRef(undefined)
  const contentRef = useRef(undefined)

  const [showLink, setShowLink] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const id = idRef.current.value
    const title = titleRef.current.value
    const content = contentRef.current.value

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Fetch Error')
        })
        .then((data) => {
          setShowLink(true)
          alert(data.message)
        })
        .catch((error) => alert(`request error: ${error}`))
    }
  }

  return (
    <>
      <Head>
        <title>Write a post</title>
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>Created Post</Link>
      )}
      <br />
      <br />
      <button
        onClick={() => router.push('/posts/pre-rendering')}
        className="rounded bg-pink-200 px-2"
      >
        pre-rendering 포스트로 이동
      </button>
      <br />
      <br />
      <button
        onClick={() =>
          router.push(`/posts/[id]`, `/posts/ssg-ssr`, { scroll: false })
        }
        className="rounded bg-pink-200 px-2"
      >
        router.push
      </button>
      <br />
      <br />
      <button
        onClick={() => router.replace(`/posts/ssg-ssr`)}
        className="rounded bg-pink-200 px-2"
      >
        router.replace
      </button>
      <br />
      <br />
      <button
        onClick={() => router.back()}
        className="rounded bg-pink-200 px-2"
      >
        router.back
      </button>
    </>
  )
}
