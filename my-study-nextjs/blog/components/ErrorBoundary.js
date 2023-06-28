import React from 'react'

/**
 * Error 관련되어서는 hook에서 life cycle method가 존재하지 않아서
 * class형 컴포넌트 사용이 불가피
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // 초기 상태를 setup
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    console.log(`getDerivedStateFromError: ${error}`)

    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    console.log(`componentDidCatch: ${(error, errorInfo)}`)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        // props로 받은 fallbackComponent가 있다면
        return this.props.fallbackComponent
      }

      return (
        <div>
          <h2>Error occurred</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
