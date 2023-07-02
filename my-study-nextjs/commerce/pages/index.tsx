import Button from '@/components/Button'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  // const [products, setProducts] = useState<
  //   { id: string; properties: { id: string } }[]
  // >([])
  // useEffect(() => {
  //   fetch(`/api/get-items`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [])
  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([])
  useEffect(() => {
    fetch(`/api/get-products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 넣어주세요')
      return
    }

    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }

  return (
    <div>
      <div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-pink w-50% border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          ref={inputRef}
          type="text"
          placeholder="name"
        />
        <button onClick={handleClick}>Add Jacket</button>
        <Button onClick={handleClick}>Add Jacket</Button>
      </div>
      <div>
        <p>Product List</p>
        {products &&
          products.map((product) => (
            <div key={product.id}>
              {product.name}
              <span>{product.createdAt}</span>
            </div>
          ))}
        {/* {products &&
          products.map((item) => (
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      fetch(
                        `/api/get-detail?pageId=${item.id}&propertyId=${
                          (value as unknown as { id: string; type: string }).id
                        }`
                      )
                        .then((res) => res.json())
                        .then((data) => alert(JSON.stringify(data.detail)))
                    }}
                  >
                    {key}
                  </button>
                ))}
              <br />
              <br />
            </div>
          ))} */}
      </div>
    </div>
  )
}
