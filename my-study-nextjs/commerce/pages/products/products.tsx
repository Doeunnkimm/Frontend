import Head from 'next/head'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import { useState } from 'react'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
]

export async function getServerSideProps() {
  const ogUrl =
    'http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html'
  const ogType = 'article'
  const ogTitle = 'When Great Minds Don’t Think Alike'
  const ogDescription = 'How much does culture influence creative thinking?'
  const ogImage =
    'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg'

  return {
    props: {
      ogUrl,
      ogType,
      ogTitle,
      ogDescription,
      ogImage,
    },
  }
}

export default function Products({
  ogUrl,
  ogType,
  ogTitle,
  ogDescription,
  ogImage,
}: {
  ogUrl: string
  ogType: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}) {
  const [index, setIndex] = useState(0)

  return (
    <>
      <Head>
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <Carousel
        animation="fade"
        autoplay
        withoutControls={true}
        wrapAround
        speed={10}
        slideIndex={index}
      >
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
    </>
  )
}
