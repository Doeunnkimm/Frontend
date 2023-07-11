import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Image
        src='/images/test.png'
        alt='test'
        width={300}
        height={300}
        placeholder='blur'
        blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      />
    </div>
  )
}
