import Details from '@/components/Details/Details';
import { ErrorBoundaryLayout } from '@/components/ErrorBoundaryLayout/ErrorBoundaryLayout';
import ErrorPage from '@/pages/errorPage/ErrorPage';
import Main from '@/pages/main/Main';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <Main />,
        path: routes.home,
        children: [
          {
            element: <Details />,
            path: routes.home,
          },
        ],
      },
      {
        element: <ErrorPage />,
        path: routes.error,
      },
    ],
  },
]);
