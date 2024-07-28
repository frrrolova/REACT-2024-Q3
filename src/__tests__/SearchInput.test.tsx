import SearchInput from '@/components/SearchInput/SearchInput';
import { lsKeys } from '@/constants';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from './utils';

vi.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = vi.fn();

vi.spyOn(Storage.prototype, 'getItem');
Storage.prototype.getItem = vi.fn();

const onSearchClickMock = vi.fn();

describe('SearchInput', () => {
  test('clicking the Search button calls the callback', () => {
    const { getByTestId } = renderWithProviders(
      <SearchInput isSearchDisabled={false} onSearchClick={onSearchClickMock} />,
    );
    const searchBtn = getByTestId('search-btn');
    const input = getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.click(searchBtn);

    expect(onSearchClickMock).toHaveBeenCalledWith('test');
  });

  test('retrieves the value from the local storage upon mounting', () => {
    renderWithProviders(<SearchInput isSearchDisabled={false} onSearchClick={onSearchClickMock} />);
    expect(localStorage.getItem).toHaveBeenCalledWith(lsKeys.searchStr);
  });
});
