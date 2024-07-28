import { fireEvent } from '@testing-library/react';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '@/providers/theme.provider';
import { renderWithProviders } from './utils';

describe('ThemeSwitcher', () => {
  test('Should apply light theme by default', () => {
    renderWithProviders(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    expect(document.body.dataset.theme).toBe('light');
  });

  test('Should apply theme when switch is clicked', async () => {
    const { container } = renderWithProviders(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    const switchElement = container.querySelector('label') as HTMLLabelElement;
    await fireEvent.click(switchElement);
    expect(document.body.dataset.theme).toBe('dark');

    await fireEvent.click(switchElement);
    expect(document.body.dataset.theme).toBe('light');
  });
});
