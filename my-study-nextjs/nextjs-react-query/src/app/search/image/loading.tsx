export default function Loading() {
  return (
    <div className='pt-10 mx-2 lg:pl-52 max-w-6xl flex sm:space-x-4 flex-col sm:flex-row pb-42'>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className='animate-pulse'>
            <div className='h-48 w-48 mb-4 bg-gray-200 rounded-md'></div>
            <div className='h-2 w-48 mb-2.5 bg-gray-200 rounded-md'></div>
            <div className='h-2 w-44 mb-2.5 bg-gray-200 rounded-md'></div>
          </div>
        ))}
    </div>
  )
}
