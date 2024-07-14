import { getSingleCharacter } from '@/services/characters.service';
import styles from './Details.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Character } from '@/types';
import loader from '/img/details-loader.webp';
import { SearchParams } from '@/enums/searchParams.enum';
import { defaultPage } from '@/constants';
import { detailsStringConstants } from './constants';

function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [person, setPerson] = useState<Character | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [isFetchErr, setIsFetchErr] = useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsloading(true);
    fetchSingleCharacter()
      ?.then((resp) => {
        setPerson(resp);
      })
      .catch(() => {
        setIsFetchErr(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
      setSearchParams({ page: searchParams.get(SearchParams.PAGE) || defaultPage });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const fetchSingleCharacter = (): Promise<Character> | null => {
    const id = searchParams.get(SearchParams.DETAILS);

    if (id) {
      return getSingleCharacter(+id);
    }

    return null;
  };

  return (
    <div className={styles.details} ref={detailsRef} data-testid="details">
      <button
        className={styles.closeBtn}
        onClick={() => {
          setSearchParams({ page: searchParams.get(SearchParams.PAGE) || defaultPage });
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

      {isLoading && (
        <div className={styles.helperWrapper} data-testid="details-loader">
          <img className={styles.loader} src={loader} alt="loader" />
        </div>
      )}

      {isFetchErr && (
        <div className={styles.helperWrapper}>
          <div>{detailsStringConstants.failedFetchMsg}</div>
        </div>
      )}

      {person && (
        <div>
          <div className={styles.img}>
            <img src={person.image} alt={person.name} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title} data-testid="details-title">
              {person.name}
            </h3>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Species:</span>
              <span data-testid="details-species">{person.species}</span>
            </p>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Gender:</span>
              <span data-testid="details-gender">{person.gender}</span>
            </p>
            {Boolean(person.type) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Type:</span>
                <span data-testid="details-type">{person.type}</span>
              </p>
            )}
            {Boolean(person.location.name) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Location:</span>
                <span data-testid="details-location">{person.location.name}</span>
              </p>
            )}
            <p className={styles.stat}>
              <span className={styles.attributeName}>Status:</span>
              <span data-testid="details-status">{person.status}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
