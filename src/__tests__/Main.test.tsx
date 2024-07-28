import { routeObjects } from '@/routes/Routing';
import { fireEvent, queryByTestId, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter, createMemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './utils';

describe('Card', () => {
  test('clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = renderWithProviders(<RouterProvider router={createMemoryRouter(routeObjects)} />);
    await waitFor(() => {
      const card = getByTestId('person-card1');
      fireEvent.click(card);
    });

    await waitFor(() => {
      expect(getByTestId('details')).toBeInTheDocument();
    });
  });

  test('card clicking triggers an additional API call', async () => {
    const { getByTestId } = renderWithProviders(<RouterProvider router={createMemoryRouter(routeObjects)} />);

    await waitFor(() => {
      const card = getByTestId('person-card1');
      fireEvent.click(card);
    });

    await waitFor(() => {
      const titleElement = getByTestId('details-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.innerHTML).toBe('Summer Smith');
    });
  });
});

describe('Details', () => {
  test('clicking the close button hides details', async () => {
    const { getByTestId } = renderWithProviders(<RouterProvider router={createMemoryRouter(routeObjects)} />);

    await waitFor(() => {
      const card = getByTestId('person-card1');
      fireEvent.click(card);
    });

    await waitFor(() => {
      const closeBtn = getByTestId('details-close');

      fireEvent.click(closeBtn);
    });

    await waitFor(() => {
      expect(queryByTestId(global.window.document.body, 'details')).not.toBeInTheDocument();
    });
  });
});

describe('Pagination', () => {
  test('Pagination updates URL query parameter when page changes', async () => {
    const { getByTestId } = renderWithProviders(<RouterProvider router={createBrowserRouter(routeObjects)} />);
    await waitFor(() => {
      expect(global.window.location.href).toContain('page=1');
      const card = getByTestId('pagination-btn1');
      fireEvent.click(card);
    });

    await waitFor(() => {
      expect(global.window.location.href).toContain('page=2');
    });
  });
});
