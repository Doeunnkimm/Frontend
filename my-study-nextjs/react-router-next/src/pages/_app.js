import { Head } from 'next/document'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
