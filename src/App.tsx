import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './routes/Routing';
import { store } from './store/store';
import SvgImages from './components/SvgImages/SvgImages';

import styles from './App.module.scss';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <div data-testid="main-wrapper-element" className={styles.mainWrapper} data-theme={theme}>
        <SvgImages />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
