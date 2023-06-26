import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
// import { useEffect, useState } from 'react'
import Link from 'next/link'
import Date from '../components/Date'

/** SSG */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

/** SSR */
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData()

//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

/** SSG & 직접 fetch하여 return */
// API Routes는 Client Side에서 Server Side로 요청하기 위해 사용하는 것이기 때문에
// 아래처럼 Server Side에서 Server Side로 요청할 때 사용하는 것이 X
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/posts')
//   const json = await response.json()

//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   }
// }

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([])

  // useEffect(() => {
  //   fetch('/api/posts')
  //     .then((res) => res.json())
  //     .then((data) => setAllPostsData(data.allPostsData))
  // }, [])
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
