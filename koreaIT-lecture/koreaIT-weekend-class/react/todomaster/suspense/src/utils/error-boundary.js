import React from 'react';

import Fallback from './Fallback';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅, 에러 기록, 에러 핸들링
    // sentry, 에러 캡쳐 및 기록 라이브러리
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
