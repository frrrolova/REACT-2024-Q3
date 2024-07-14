import { fireEvent, render, waitFor } from '@testing-library/react';
import { characterMock, getPageMock, getSingleCharacterMock } from './test-constants';
import Details from '@/components/Details/Details';

vi.mock('@/services/characters.service', () => {
  return {
    getCharacters: vi.fn().mockImplementation(() => getPageMock()),
    getSingleCharacter: vi.fn().mockImplementation((id: number) => getSingleCharacterMock(id)),
  };
});

const searchParams = new URLSearchParams({ details: '1' });

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useSearchParams: () => [
    searchParams,
    vi.fn().mockImplementation(() => {
      searchParams.delete('details');
    }),
  ],
}));

describe('Details', () => {
  test('loading indicator is displayed while fetching data', async () => {
    const { getByTestId } = render(<Details />);

    expect(getSingleCharacterMock).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(getByTestId('details-loader')).toBeInTheDocument();
    });
  });

  test('correctly displays the detailed card data', async () => {
    const { getByTestId } = render(<Details />);

    await waitFor(() => {
      const title = getByTestId('details-title');
      const species = getByTestId('details-species');
      const gender = getByTestId('details-gender');
      const type = getByTestId('details-type');
      const location = getByTestId('details-location');
      const status = getByTestId('details-status');

      expect(title.textContent).toBe(characterMock.name);
      expect(species.textContent).toBe(characterMock.species);
      expect(gender.textContent).toBe(characterMock.gender);
      expect(type.textContent).toBe(characterMock.type);
      expect(location.textContent).toBe(characterMock.location.name);
      expect(status.textContent).toBe(characterMock.status);
    });
  });

  test('clicking the close button correctly changes search params', async () => {
    const { getByTestId } = render(<Details />);

    const closeBtn = getByTestId('details-close');

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(searchParams.get('details')).toBe(null);
    });
  });
});
