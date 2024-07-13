import { Characters } from '@/types';
import Card from '../Card/Card';
import styles from './Content.module.scss';
import titleImg from '/img/title-img.webp';
import loader from '/img/loader.webp';

interface ContentProps {
  showEmptyRespNotification: boolean;
  persons: Characters[];
  isLoading: boolean;
}

function Content({ showEmptyRespNotification, persons, isLoading }: ContentProps) {
  return (
    <div>
      <h1 className={styles.title}>
        Results <img className={styles.titleImg} src={titleImg} alt="ball" />
      </h1>
      {isLoading && <img className={styles.loader} src={loader} alt="loader" />}
      {!isLoading && (
        <ul className={styles.list}>
          {showEmptyRespNotification && <div>No results</div>}
          {persons.map((person: Characters) => {
            if (person.name) {
              return <Card key={`${person.id}`} person={person} />;
            }
          })}
        </ul>
      )}
    </div>
  );
}

export default Content;
