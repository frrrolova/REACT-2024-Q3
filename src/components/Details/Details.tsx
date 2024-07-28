// import { getSingleCharacter } from '@/services/characters.service';
import styles from './Details.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// import loader from '/img/details-loader.webp';
import { SearchParams } from '@/enums/searchParams.enum';
import { defaultPage } from '@/constants';
import { detailsStringConstants } from './constants';
import { useGetCharacterByIdQuery } from '@/services/characters.service';

function Details() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: character, status, isError } = useGetCharacterByIdQuery(searchParams.get(SearchParams.DETAILS) ?? '');

  const detailsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
      setSearchParams({ page: searchParams.get(SearchParams.PAGE) || String(defaultPage) });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className={styles.details} ref={detailsRef} data-testid="details">
      <button
        className={styles.closeBtn}
        onClick={() => {
          setSearchParams({ page: searchParams.get(SearchParams.PAGE) || String(defaultPage) });
        }}
        data-testid="details-close"
      >
        <svg
          height="32px"
          width="32px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490 490"
          className={styles.cross}
        >
          <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
        </svg>
      </button>

      {status === 'pending' && (
        <div className={styles.helperWrapper} data-testid="details-loader">
          <svg className={styles.loader} width="200" height="200" version="2.0">
            <use href="#rick-head" />
          </svg>
        </div>
      )}

      {isError && (
        <div className={styles.helperWrapper}>
          <div>{detailsStringConstants.failedFetchMsg}</div>
        </div>
      )}

      {character && (
        <div>
          <div className={styles.img}>
            <img src={character.image} alt={character.name} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title} data-testid="details-title">
              {character.name}
            </h3>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Species:</span>
              <span data-testid="details-species">{character.species}</span>
            </p>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Gender:</span>
              <span data-testid="details-gender">{character.gender}</span>
            </p>
            {Boolean(character.type) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Type:</span>
                <span data-testid="details-type">{character.type}</span>
              </p>
            )}
            {Boolean(character.location.name) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Location:</span>
                <span data-testid="details-location">{character.location.name}</span>
              </p>
            )}
            <p className={styles.stat}>
              <span className={styles.attributeName}>Status:</span>
              <span data-testid="details-status">{character.status}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
