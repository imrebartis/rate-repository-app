import { Component } from 'react';
import Text from './Text';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text color='tertiary'
          fontWeight='bold'>
          {this.state.error.toString()}
        </Text>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
