import { products } from '@prisma/client'
import { TAKE } from 'constants/products'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-products?skip=&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  const getProducts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.products)
        setProducts(list)
      })
    setSkip(next)
  }, [])

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <div key={product.id}>
              {product.image_url && (
                <Image
                  className="rounded"
                  src={product.image_url}
                  width={300}
                  height={200}
                  alt={product.name}
                  // 데이터 로딩 시 blur처리 & 블러이미지 처리
                  placeholder="blur"
                  blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                />
              )}
              <div className="flex">
                <span>{product.name}</span>
                <span className="ml-auto">
                  {product.price.toLocaleString('ko-KR')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {product.category_id === 1 && '의류'}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  )
}
