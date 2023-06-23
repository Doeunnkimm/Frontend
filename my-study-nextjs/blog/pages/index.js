import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'
import { useEffect, useState } from 'react'

/** SSG */
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()

//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

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
export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts')
  const json = await response.json()

  return {
    props: {
      allPostsData: json.allPostsData,
    },
  }
}

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
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
