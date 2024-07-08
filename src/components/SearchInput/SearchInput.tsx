import React, { createRef } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  onSearchClick: (str: string) => void;
  isSearchDisabled: boolean;
}

class SearchInput extends React.Component<SearchInputProps> {
  private inputRef = createRef<HTMLInputElement>();

  constructor(props: SearchInputProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
          const currentSearchStr = this.inputRef.current?.value.toLowerCase().trim();
          localStorage.setItem('searchString', currentSearchStr || '');
          this.props.onSearchClick(currentSearchStr || '');
          if (!currentSearchStr && this.inputRef.current?.value) {
            this.inputRef.current.value = '';
          }
        }}
      >
        <input
          defaultValue={localStorage.getItem('searchString') ?? ''}
          placeholder="Search pokemon"
          type="input"
          ref={this.inputRef}
          className={styles.input}
        />
        <button disabled={this.props.isSearchDisabled} type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchInput;
