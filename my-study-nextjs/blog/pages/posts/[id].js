import { getAllPostIds, getPostData } from '@/lib/posts'
import Date from '@/components/Date'
import utilStyles from '@/styles/utils.module.css'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '@/components/CodeBlock'
// import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { siteTitle } from '../_document'
import { useState } from 'react'

const Button = dynamic(() => import('@/components/Button'), {
  loading: () => <div>Loading...</div>,
})

export async function getStaticPaths() {
  const paths = getAllPostIds()

  // 아래와 같이 작성한다면 build 타임에 아래와 같은 요소가 존재하게 되는 것
  // const paths = [
  //   {
  //     params: {
  //       id: 'ssg-ssr',
  //     },
  //   },
  // ]
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  console.log({ params }) // { params: { id: 'ssg-ssr' } }

  return {
    props: {
      postData,
    },
  }
}

const components = {
  Button,
  CodeBlock,
}

export default function Post({ postData, pathname }) {
  const router = useRouter()

  const ErrorComponent = () => {
    const [error, setError] = useState(false)

    if (error) {
      throw new Error('Error occurred')
    }

    return (
      <button
        className="rounded px-2 bg-green-500"
        onClick={() => setError(true)}
      >
        Error Fire
      </button>
    )
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
      </Head>
      <ErrorComponent />
      <article>
        <h2>pathname: {pathname}</h2>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </>
  )
}
