import { useRef } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  onSearchClick: (str: string) => void;
  isSearchDisabled: boolean;
}

function SearchInput({ isSearchDisabled, onSearchClick }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        const currentSearchStr = inputRef.current?.value.toLowerCase().trim();
        localStorage.setItem('searchString', currentSearchStr || '');
        onSearchClick(currentSearchStr || '');
        if (!currentSearchStr && inputRef.current?.value) {
          inputRef.current.value = '';
        }
      }}
    >
      <input
        defaultValue={localStorage.getItem('searchString') ?? ''}
        placeholder="Search pokemon"
        type="input"
        ref={inputRef}
        className={styles.input}
      />
      <button disabled={isSearchDisabled} type="submit" className={styles.btn}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
