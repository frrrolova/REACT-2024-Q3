import SearchInput from '@/components/SearchInput/SearchInput';
import { lsKeys } from '@/constants';
import { fireEvent, render } from '@testing-library/react';

vi.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = vi.fn();

vi.spyOn(Storage.prototype, 'getItem');
Storage.prototype.getItem = vi.fn();

const onSearchClickMock = vi.fn();

describe('SearchInput', () => {
  test('clicking the Search button saves value to the local storage', () => {
    const { getByTestId } = render(<SearchInput isSearchDisabled={false} onSearchClick={onSearchClickMock} />);
    const searchBtn = getByTestId('search-btn');
    const input = getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.click(searchBtn);

    expect(localStorage.setItem).toHaveBeenCalledWith(lsKeys.searchStr, 'test');
  });

  test('retrieves the value from the local storage upon mounting', () => {
    render(<SearchInput isSearchDisabled={false} onSearchClick={onSearchClickMock} />);
    expect(localStorage.getItem).toHaveBeenCalledWith(lsKeys.searchStr);
  });
});
