import ErrorNext from 'next/error'

function Error({ statusCode }) {
  if (statusCode === 404) {
    return <p>404에러에요!</p>
  }
  return <ErrorNext statusCode={statusCode} />
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
