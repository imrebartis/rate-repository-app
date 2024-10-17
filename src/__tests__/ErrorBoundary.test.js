import { render, screen } from '@testing-library/react-native';
import ErrorBoundary from '../components/ErrorBoundary';
import Text from '../components/Text';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('catches errors and displays the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Test error/i)).toBeTruthy();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <Text>Normal content</Text>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Normal content/i)).toBeTruthy();
  });
});
