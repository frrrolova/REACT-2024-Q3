import { renderWithProviders } from './utils';
import App from '@/App';

describe('ThemeSwitcher', () => {
  test('Should apply light theme by default', () => {
    const { getByTestId } = renderWithProviders(<App />);

    expect(getByTestId('main-wrapper-element').dataset.theme).toBe('light');
  });
});
