import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeSwitcher.module.scss';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'light');

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={styles.wrapper}>
      <span
        onClick={() => {
          setTheme('light');
        }}
      >
        light
      </span>
      <label className={styles.switcherWrapper} htmlFor={styles.invisibleThemeSwitcher}>
        <div className={styles.trail}></div>
        <div className={styles.circle}></div>
        <input
          id={styles.invisibleThemeSwitcher}
          type="checkbox"
          checked={checked}
          onChange={() => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            setChecked(newTheme === 'light');
          }}
        />
      </label>
      <span
        onClick={() => {
          setTheme('dark');
        }}
      >
        dark
      </span>
    </div>
  );
}
