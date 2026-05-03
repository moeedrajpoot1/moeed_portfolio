import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    const label = this.props.label || 'ErrorBoundary';
    console.error(`[${label}] caught error:`, error, info);
    if (typeof this.props.onError === 'function') this.props.onError(error, info);
  }

  reset = () => this.setState({ failed: false });

  render() {
    if (this.state.failed) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({ reset: this.reset });
      }
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
