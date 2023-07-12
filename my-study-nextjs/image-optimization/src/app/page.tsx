import Image from 'next/image'

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <Image
        src='/images/test.png'
        alt='test'
        // width={300}
        // height={300}
        layout='fill'
        sizes='(max-width: 768px) 50vw,
         (max-width: 1024px) 100vw'
        placeholder='blur'
        blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      />
    </div>
  )
}
