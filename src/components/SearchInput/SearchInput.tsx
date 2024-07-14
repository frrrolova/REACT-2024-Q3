import { useRef } from 'react';
import styles from './SearchInput.module.scss';
import { lsKeys } from '@/constants';
import { useLS } from '@/hooks/useLS';

interface SearchInputProps {
  onSearchClick: (str: string) => void;
  isSearchDisabled: boolean;
}

function SearchInput({ isSearchDisabled, onSearchClick }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useLS(lsKeys.searchStr);

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        const currentSearchStr = inputRef.current?.value.toLowerCase().trim();
        setSearchInput(currentSearchStr || '');
        onSearchClick(currentSearchStr || '');
        if (!currentSearchStr && inputRef.current?.value) {
          inputRef.current.value = '';
        }
      }}
    >
      <input
        defaultValue={searchInput ?? ''}
        placeholder="Search character"
        type="input"
        ref={inputRef}
        className={styles.input}
        data-testid="search-input"
      />
      <button disabled={isSearchDisabled} type="submit" className={styles.btn} data-testid="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
