import { ThemeContext } from '@/providers/theme.provider';
import { useContext } from 'react';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return { theme, setTheme };
};
