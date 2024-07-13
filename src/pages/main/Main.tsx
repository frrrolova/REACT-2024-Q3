import Content from '@/components/Content/Content';
import Header from '@/components/Header/Header';
import SearchInput from '@/components/SearchInput/SearchInput';
import { getPokemons } from '@/services/characters.service';
import { Characters } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';

function Main() {
  const [persons, setPersons] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyRespNotification, setShowEmptyRespNotification] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setSearchParams({ page: searchParams.get('page') || '1' });

    fetchPokemons(localStorage.getItem('searchString') ?? '', searchParams.get('page') || '1');
  }, []);

  const fetchPokemons = async (searchString: string = '', page: string): Promise<void> => {
    setIsLoading(true);
    setShowEmptyRespNotification(true);
    getPokemons(searchString, page)
      .then((fetchedData) => {
        setPersons(fetchedData.results);
        setShowEmptyRespNotification(!fetchedData.results.length);
        setTotal(fetchedData.info.count);
        setPages(fetchedData.info.pages);
      })
      .catch(() => {
        setPersons([]);
        setShowEmptyRespNotification(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Header>
        <SearchInput
          isSearchDisabled={isLoading}
          onSearchClick={(searchString) => {
            setSearchParams({ page: '1' });
            fetchPokemons(searchString, '1');
          }}
        />
      </Header>
      <div className={styles.sectionsWrapper}>
        <Content
          showEmptyRespNotification={showEmptyRespNotification}
          persons={persons}
          isLoading={isLoading}
          onCardSelect={(card) => {
            console.log(card);
          }}
        >
          {total ? (
            <Pagination
              currentPage={+(searchParams.get('page') || '1')}
              // totalItems={total}
              pages={pages}
              // pageSize={PAGE_SIZE}
              maxPageCells={3}
              onPageChange={(page) => {
                setSearchParams({ page: String(page) });
                fetchPokemons(localStorage.getItem('searchString') ?? '', String(page));
              }}
            />
          ) : undefined}
        </Content>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
