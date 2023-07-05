import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { categories, products } from '@prisma/client'
import { IconAt } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'
import useDebounce from 'hooks/useDebounce'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Products() {
  // const [products, setProducts] = useState<products[]>([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<categories[]>([])
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce<string>(keyword) // 디바운스된 값이 담김

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.items))
  }, [])

  useEffect(() => {
    fetch(
      `/api/get-products-count?category=${selectedCategory}?contains=${debouncedKeyword}`
    )
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.products / TAKE)))
  }, [selectedCategory, debouncedKeyword])

  // useEffect(() => {
  //   const skip = TAKE + (activePage - 1)
  //   fetch(
  //     `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}?contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.products))
  // }, [activePage, selectedCategory, selectedFilter, debouncedKeyword])

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE + (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}?contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE + (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}?contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="mb-4">
        <Input
          icon={<IconAt />}
          placeholder="Search"
          value={keyword}
          onChange={handleKeyword}
        />
      </div>
      <div className="mb-4">
        <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
      </div>
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}
      {products && (
        <div className="grid grid-cols-3 gap-3">
          {products.map((product) => (
            <div key={product.id} style={{ maxWidth: 310 }}>
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
                {CATEGORY_MAP[product.category_id - 1]}
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
