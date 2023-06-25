import Layout from '../../components/Layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/Date'
import utilStyles from '../../styles/utils.module.css'
import { useRouter } from 'next/router'

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

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
