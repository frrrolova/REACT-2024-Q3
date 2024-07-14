import { routeObjects } from '@/routes/Routing';
import { fireEvent, queryByTestId, render, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter, createMemoryRouter } from 'react-router-dom';
import { getPageMock, getSingleCharacterMock } from './test-constants';

vi.mock('@/services/characters.service', () => {
  return {
    getCharacters: vi.fn().mockImplementation(() => getPageMock()),
    getSingleCharacter: vi.fn().mockImplementation(() => getSingleCharacterMock()),
  };
});

describe('Main', () => {
  test('clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = render(<RouterProvider router={createMemoryRouter(routeObjects)} />);
    await waitFor(() => {
      const card = getByTestId('person-card1');
      fireEvent.click(card);
    });

    await waitFor(() => {
      expect(getByTestId('details')).toBeInTheDocument();
    });
  });

  test('card clicking triggers an additional API call', async () => {
    const { getByTestId } = render(<RouterProvider router={createMemoryRouter(routeObjects)} />);

    await waitFor(() => {
      const card = getByTestId('person-card1');
      fireEvent.click(card);
    });

    expect(getSingleCharacterMock).toHaveBeenCalled();
  });

  test('clicking the close button hides details', async () => {
    const { getByTestId } = render(<RouterProvider router={createMemoryRouter(routeObjects)} />);

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

  test('Pagination updates URL query parameter when page changes', async () => {
    const { getByTestId } = render(<RouterProvider router={createBrowserRouter(routeObjects)} />);
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