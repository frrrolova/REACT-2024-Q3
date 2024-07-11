import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import logoImg from '/img/pokemon-logo.webp';
import styles from './Header.module.scss';

interface HeaderProps {
  onSearch: (searchStr: string) => void;
  isSearchDisabled: boolean;
}

interface HeaderState {
  isErrClicked: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isErrClicked: false,
    };
  }

  render(): React.ReactNode {
    if (this.state.isErrClicked) {
      throw new Error('App Crashed');
    }
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} alt="logo" />
        </div>
        <SearchInput isSearchDisabled={this.props.isSearchDisabled} onSearchClick={this.props.onSearch} />
        <div>
          <button
            className={styles.errBtn}
            onClick={() => {
              this.setState((state) => ({ ...state, isErrClicked: true }));
            }}
          >
            Show Error
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
