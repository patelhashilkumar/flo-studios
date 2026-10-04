import React from 'react'
import './ErrorBoundary.css'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Flo Studios Runtime Error Caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flo-error-boundary">
          <div className="flo-error-card">
            <span className="flo-error-badge">SYSTEM RECOVERY</span>
            <h1 className="flo-error-title">Something went wrong</h1>
            <p className="flo-error-desc">
              We encountered an unexpected display issue. Your data is safe. Please refresh the page or return to the home page.
            </p>
            <div className="flo-error-actions">
              <button
                type="button"
                onClick={this.handleReload}
                className="flo-error-btn flo-error-btn--primary"
              >
                Reload Page ↺
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="flo-error-btn flo-error-btn--secondary"
              >
                Go to Home →
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
