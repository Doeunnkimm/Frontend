'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs'

export default function HomeSearch() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [randomSearchLoading, setRandomSearchLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return
    router.push(`/search/web?searchTerm=${input}`)
  }

  const randomSearch = async () => {
    setRandomSearchLoading(true)
    const response = await fetch('https://random-word-api.herokuapp.com/word')
      .then((res) => res.json())
      .then((data) => data[0])

    if (!response) return
    router.push(`/search/image?searchTerm=${response}`)
    setRandomSearchLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='w-full'>
        <div className='flex w-full mt-5 mx-auto max-w[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md transition-shadow focus-within:shadow-md sm:max-w-xl lg:max-w-2xl'>
          <AiOutlineSearch className='text-xl text-gray-500 mr-3' />
          <input
            type='text'
            className='flex-grow focus:outline-none'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            value={input}
          />
          <BsFillMicFill className='text-lg ' />
        </div>
        <div className='flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 items-center justify-center sm:flex-row mt-8'>
          <button
            type='submit'
            className='btn'>
            Google Search
          </button>
          <button
            onClick={randomSearch}
            disabled={randomSearchLoading}
            className='btn flex items-center justify-center disabled:opacity-80'>
            {randomSearchLoading ? (
              <Image
                src='spinner.svg'
                width='30'
                height='30'
                alt='spinner'
                className='h-6 text-center'
              />
            ) : (
              `I am Feeling Lucky`
            )}
          </button>
        </div>
      </form>
    </>
  )
}
