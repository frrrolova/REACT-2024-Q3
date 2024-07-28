import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './routes/Routing';
import { store } from './store/store';
import SvgImages from './components/SvgImages/SvgImages';
import { ThemeProvider } from './providers/theme.provider';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <>
          <SvgImages />
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
