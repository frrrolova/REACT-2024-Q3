import { useRef } from 'react';
import styles from './SearchInput.module.scss';
import { lsKeys } from '@/constants';
import { useLS } from '@/hooks/useLS';
import { useGetCharactersResultWithLatestParams } from '@/hooks/useGetCharactersResultWithLatestParams';

interface SearchInputProps {
  onSearchClick: (str: string) => void;
  isSearchDisabled: boolean;
}

function SearchInput({ onSearchClick }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryState = useGetCharactersResultWithLatestParams();

  const [searchInput] = useLS(lsKeys.searchStr);

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        const currentSearchStr = inputRef.current?.value.toLowerCase().trim();
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
      <button disabled={queryState.isFetching} type="submit" className={styles.btn} data-testid="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
