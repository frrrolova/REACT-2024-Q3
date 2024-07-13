import { Characters } from '@/types';
import Card from '../Card/Card';
import styles from './Content.module.scss';
import titleImg from '/img/title-img.webp';
import loader from '/img/loader.webp';
// import Pagination from '../Pagination/Pagination';
// import { useState } from 'react';

interface ContentProps {
  showEmptyRespNotification: boolean;
  persons: Characters[];
  isLoading: boolean;
  // onPaginationClick: (page: number) => void;
  onCardSelect: (card: number) => void;
  children?: JSX.Element;
}

function Content({
  showEmptyRespNotification,
  persons,
  isLoading,
  // onPaginationClick,
  onCardSelect,
  children,
}: ContentProps) {
  // const [currentPage, setCurrentPage] = useState(25);
  return (
    <div className={styles.container}>
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
        {persons.map((person: Characters) => {
          if (person.name) {
            return <Card key={`${person.id}`} person={person} onCardClick={onCardSelect} />;
          }
        })}
      </ul>

      {children}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={1000}
        pageSize={20}
        maxPageCells={3}
        onPageChange={(newPage) => {
          setCurrentPage(newPage);
          onPaginationClick(newPage);
        }}
      /> */}
    </div>
  );
}

export default Content;
