import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { format } from 'date-fns'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [visitedTime] = useState(new Date())

  return (
    // 아래와 같이 _app.js에서 Layout을 감싸주면
    // _app.js는 전체 컴포넌트의 Wrapper이기 때문에 전부 적용된다.
    <Layout home={router.pathname === '/'}>
      <div>visited: {format(visitedTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</div>

      {/* 
        props로 fallback을 보내주었다하면 그것을 보여주고,
        그것이 아니라면, default를 보여주게 됨
      */}
      <ErrorBoundary fallbackComponent={<div>에러 발생! 🚨</div>}>
        <Component {...pageProps} pathname={router.pathname} />
      </ErrorBoundary>
    </Layout>
  )
}
