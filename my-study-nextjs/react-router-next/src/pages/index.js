import Layout from '../components/Layout'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Layout>
      <p>Page 1</p>

      <Link href="/page2">Next Page</Link>
    </Layout>
  )
}
