import Details from '@/components/Details/Details';
import ErrorPage from '@/pages/errorPage/ErrorPage';
import Main from '@/pages/main/Main';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Main />,
    errorElement: <ErrorPage />,
    path: '/',
    children: [
      {
        element: <Details />,
        path: '/',
      },
    ],
  },
]);
