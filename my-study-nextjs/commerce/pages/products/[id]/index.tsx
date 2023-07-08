import { EditorState, convertFromRaw } from 'draft-js'

import { CATEGORY_MAP } from 'constants/products'
import Carousel from 'nuka-carousel'
import CustomEditor from '@/components/Editor'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { format } from 'date-fns'
import { products } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // getServerSideProps 함수에서는 URL을 full로 입력해야 한다.
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  }
}

export default function Products(props: {
  product: products & { images: string[] }
}) {
  const [index, setIndex] = useState(0) // 이미지의 인덱스

  const router = useRouter()
  const { id: productId } = router.query
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product?.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  )

  const { product } = props

  return (
    <>
      {product !== null && productId !== null ? (
        <div className="p-24 flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              autoplay
              withoutControls={true}
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product?.images.map((url, idx) => (
                <Image
                  key={`${url}-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                  layout="responsive"
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product?.images.map((url, idx) => (
                <div key={`${url}-thumbs-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>
            <div className="text-sm text-zinc-300">
              {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중..</div>
      )}
      {editorState != null && (
        <CustomEditor editorState={editorState} readOnly />
      )}
    </>
  )
}
