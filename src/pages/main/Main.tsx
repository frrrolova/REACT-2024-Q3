import Content from '@/components/Content/Content';
import Header from '@/components/Header/Header';
import SearchInput from '@/components/SearchInput/SearchInput';
import { getCharacters } from '@/services/characters.service';
import { Character } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';
import { defaultPage, lsKeys } from '@/constants';
import { SearchParams } from '@/enums/searchParams.enum';

function Main() {
  const [persons, setPersons] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyRespNotification, setShowEmptyRespNotification] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const detailsParam = searchParams.get(SearchParams.DETAILS);

  useEffect(() => {
    setSearchParams({ page: searchParams.get(SearchParams.PAGE) || defaultPage });

    fetchCharacters(localStorage.getItem(lsKeys.searchStr) ?? '', searchParams.get(SearchParams.PAGE) || defaultPage);
  }, []);

  const fetchCharacters = (searchString: string = '', page: string): Promise<void> => {
    setIsLoading(true);
    setShowEmptyRespNotification(true);
    return getCharacters(searchString, page)
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
            setSearchParams({ page: defaultPage });
            fetchCharacters(searchString, defaultPage);
          }}
        />
      </Header>
      <div className={styles.sectionsWrapper}>
        <Content
          showEmptyRespNotification={showEmptyRespNotification}
          persons={persons}
          isLoading={isLoading}
          onCardSelect={(card) => {
            setSearchParams({ page: searchParams.get(SearchParams.PAGE) || defaultPage, details: String(card) });
          }}
        >
          {total ? (
            <Pagination
              currentPage={+(searchParams.get(SearchParams.PAGE) || defaultPage)}
              pages={pages}
              maxPageCells={3}
              onPageChange={(page) => {
                setSearchParams({ page: String(page) });
                fetchCharacters(localStorage.getItem(lsKeys.searchStr) ?? '', String(page));
              }}
            />
          ) : undefined}
        </Content>
        {detailsParam && <Outlet />}
      </div>
    </>
  );
}

export default Main;
