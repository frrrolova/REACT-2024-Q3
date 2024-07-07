import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import styles from './Header.module.scss';

interface HeaderProps {
  onSearch: (searchStr: string) => void;
  isSearchDisabled: boolean;
}

class Header extends React.Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <header className={styles.header}>
        <div>TITLE</div>
        <SearchInput isSearchDisabled={this.props.isSearchDisabled} onSearchClick={this.props.onSearch} />
      </header>
    );
  }
}

export default Header;
