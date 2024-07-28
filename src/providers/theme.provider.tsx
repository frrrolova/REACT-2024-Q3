import React, { PropsWithChildren, useState } from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (value: string) => {
    console.log(value);
    // noop
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState('light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
