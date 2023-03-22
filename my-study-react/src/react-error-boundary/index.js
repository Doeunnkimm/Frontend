const { useState } = require('react');
const { ErrorBoundary } = require('react-error-boundary');

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>Something went wrong :(</p>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>다시시도</button>
    </div>
  );
}

function Bomb() {
  throw new Error('에러 발생🚨🚨');
}

function ErrorBoundaryIndex() {
  const [error, setError] = useState(false);
  return (
    <>
      <button onClick={() => setError((prev) => !prev)}>
        에러 발생 버튼!!
      </button>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setError(false)}
        resetKeys={[error]}
      >
        {error ? <Bomb /> : null}
      </ErrorBoundary>
    </>
  );
}

export default ErrorBoundaryIndex;
