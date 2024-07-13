import { Character } from '@/types';
import Card from '../Card/Card';
import styles from './Content.module.scss';
import titleImg from '/img/title-img.webp';
import loader from '/img/loader.webp';
import { useSearchParams } from 'react-router-dom';

interface ContentProps {
  showEmptyRespNotification: boolean;
  persons: Character[];
  isLoading: boolean;
  onCardSelect: (card: number) => void;
  children?: JSX.Element;
}

function Content({ showEmptyRespNotification, persons, isLoading, onCardSelect, children }: ContentProps) {
  const [searchParams] = useSearchParams();

  return (
    <div className={`${styles.container} ${searchParams.get('details') ? styles.left : ''}`}>
      {persons?.length && (
        <h1 className={styles.title}>
          Results <img className={styles.titleImg} src={titleImg} alt="ball" />
        </h1>
      )}

      {isLoading && (
        <div className={styles.loaderWrapper}>
          <img className={styles.loader} src={loader} alt="loader" />
        </div>
      )}

      <ul className={styles.list}>
        {showEmptyRespNotification && <div>No results</div>}
        {persons.map((person: Character) => {
          if (person.name) {
            return <Card key={`${person.id}`} person={person} onCardClick={onCardSelect} />;
          }
        })}
      </ul>

      {children}
    </div>
  );
}

export default Content;
