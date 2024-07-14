import ErrorPage from '@/pages/errorPage/ErrorPage';
import { routes } from '@/routes/routes';
import { fireEvent, render } from '@testing-library/react';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('ErrorPage', () => {
  test('Home click navigates with home path', async () => {
    const { getByTestId } = render(<ErrorPage />);
    const btn = getByTestId('err-homeBtn');
    fireEvent.click(btn);

    expect(mockedUsedNavigate).toHaveBeenCalledWith(routes.home);
  });
});
