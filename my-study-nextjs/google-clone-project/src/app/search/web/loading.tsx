export default function Loading() {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className='mx-2 pt-10 max-w6xl lg:pl-52 animate-pulse'>
            <div className='h-2.5 w-48 bg-gray-200 rounded-full mb-2.5'></div>
            <div className='h-3.5 w-[360px] bg-gray-200 rounded-full mb-2.5'></div>
            <div className='h-2 max-w-[560px] bg-gray-200 rounded-full mb-2.5'></div>
            <div className='h-2 max-w-[530px] bg-gray-200 rounded-full mb-2.5'></div>
          </div>
        ))}
    </>
  )
}
