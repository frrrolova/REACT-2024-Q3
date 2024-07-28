import Pagination from '@/components/Pagination/Pagination';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from './utils';

const onPageChangeMock = vi.fn();

describe('Pagination', () => {
  test('updates page number', () => {
    const { getByTestId } = renderWithProviders(
      <Pagination currentPage={1} pages={3} maxPageCells={7} onPageChange={onPageChangeMock} />,
    );

    const nextBtn = getByTestId('pagination-btn1');

    fireEvent.click(nextBtn);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
  test('active btn get class "active', () => {
    const { getByTestId } = renderWithProviders(
      <Pagination currentPage={1} pages={3} maxPageCells={7} onPageChange={onPageChangeMock} />,
    );
    const activeBtn = getByTestId('pagination-btn0');

    expect(activeBtn.className).toContain('active');
  });
});
