import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { format } from 'date-fns'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [visitedTime] = useState(new Date())

  return (
    // 아래와 같이 _app.js에서 Layout을 감싸주면
    // _app.js는 전체 컴포넌트의 Wrapper이기 때문에 전부 적용된다.
    <Layout home={router.pathname === '/'}>
      <div>visited: {format(visitedTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</div>
      <Component {...pageProps} pathname={router.pathname} />
    </Layout>
  )
}
