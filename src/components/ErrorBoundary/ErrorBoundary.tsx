import React, { ErrorInfo, PropsWithChildren } from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.eBoundary}>
          <div className={styles.content}>
            <h1 className={styles.title}>Something went wrong.</h1>
            <div>
              <button
                className={styles.btn}
                onClick={() => {
                  this.setState((state) => ({ ...state, hasError: false }));
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
