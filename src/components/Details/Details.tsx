import { getSingleCharacter } from '@/services/characters.service';
import styles from './Details.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Character } from '@/types';

function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [person, setPerson] = useState<Character | null>(null);

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSingleCharacter()?.then((resp) => {
      setPerson(resp);
    });
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
      setSearchParams({ page: searchParams.get('page') || '1' });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const fetchSingleCharacter = (): Promise<Character> | null => {
    const id = searchParams.get('details');
    if (id) {
      return getSingleCharacter(+id);
    }

    return null;
  };

  return (
    <div className={styles.details} ref={detailsRef}>
      <button
        className={styles.closeBtn}
        onClick={() => {
          setSearchParams({ page: searchParams.get('page') || '1' });
        }}
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

      {person && (
        <div>
          <div className={styles.img}>
            <img src={person.image} alt={person.name} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{person.name}</h3>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Species:</span>
              <span>{person.species}</span>
            </p>
            <p className={styles.stat}>
              <span className={styles.attributeName}>Gender:</span>
              <span>{person.gender}</span>
            </p>
            {Boolean(person.type) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Type:</span>
                <span>{person.type}</span>
              </p>
            )}
            {Boolean(person.location.name) && (
              <p className={styles.stat}>
                <span className={styles.attributeName}>Location:</span>
                <span>{person.location.name}</span>
              </p>
            )}
            <p className={styles.stat}>
              <span className={styles.attributeName}>Status:</span>
              <span>{person.status}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
