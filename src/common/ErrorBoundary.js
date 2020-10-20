import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      error,
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      hasError: true,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError && errorInfo) {
      // if it is in development state, component will display error detail
      const errorDetails =
        process.env.NODE_ENV === 'development' ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : (
          <h1>Something went wrong</h1>
        );

      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }

    return this.props.children;
  }
}
