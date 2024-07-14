import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}
