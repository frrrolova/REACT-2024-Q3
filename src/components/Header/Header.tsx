import { useState } from 'react';
import logoImg from '/img/pokemon-logo.webp';
import styles from './Header.module.scss';

interface HeaderProps {
  children: JSX.Element;
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
      <div>
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
