import { Pagination } from '@mantine/core'
import { products } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TAKE = 9 // 한 페이지에 9개씩

export default function Products() {
  const [products, setProducts] = useState<products[]>([])
  const [total, setTotal] = useState(0)
  const [activePage, setPage] = useState(1)

  useEffect(() => {
    fetch(`/api/get-products-count`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.products / TAKE)))

    fetch(`/api/get-products?skip=&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  useEffect(() => {
    const skip = TAKE + (activePage - 1)
    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [activePage])

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
      <div className="w-full flex mt-5">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  )
}
