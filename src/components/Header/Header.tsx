import { useState } from 'react';
import logoImg from '/img/logo.webp';
import styles from './Header.module.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

interface HeaderProps {
  children?: JSX.Element;
}

function Header({ children }: HeaderProps) {
  const [isErrorClicked, setIsErrorClicked] = useState(false);

  if (isErrorClicked) {
    throw new Error('App Crashed');
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoImg} alt="logo" />
      </div>
      {children}
      <div className={styles.actions}>
        <ThemeSwitcher />
        <button
          className={styles.errBtn}
          onClick={() => {
            setIsErrorClicked(true);
          }}
        >
          Show Error
        </button>
      </div>
    </header>
  );
}

export default Header;
