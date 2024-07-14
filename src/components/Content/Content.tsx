import { Character } from '@/types';
import Card from '../Card/Card';
import styles from './Content.module.scss';
import titleImg from '/img/title-img.webp';
import loader from '/img/loader.webp';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '@/enums/searchParams.enum';
import { contentStringConstants } from './constants';

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
    <div className={`${styles.container} ${searchParams.get(SearchParams.DETAILS) ? styles.left : ''}`}>
      <h1 className={styles.title}>
        {contentStringConstants.title} <img className={styles.titleImg} src={titleImg} alt="img" />
      </h1>

      {isLoading && (
        <div className={styles.loaderWrapper}>
          <img className={styles.loader} src={loader} alt="loader" />
        </div>
      )}

      <ul className={styles.list} data-testid="cards-list">
        {showEmptyRespNotification && <div className={styles.empty}>{contentStringConstants.emptyNotification}</div>}
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
