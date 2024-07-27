import Content from '@/components/Content/Content';
import Header from '@/components/Header/Header';
import SearchInput from '@/components/SearchInput/SearchInput';
import { useLazyGetCharactersQuery } from '@/services/characters.service';
import { useEffect } from 'react';
import styles from './Main.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination/Pagination';
import { defaultPage, lsKeys } from '@/constants';
import { SearchParams } from '@/enums/searchParams.enum';
import { useLS } from '@/hooks/useLS';
import { useAppDispatch } from '@/store/store';
import { setCurrentPage, setSearchString } from '@/store/slices/characters/charactersSlice';
import FlyOut from '@/components/FlyOut/FlyOut';

function Main() {
  const dispatch = useAppDispatch();
  const [searchString, setSearchStringToLs] = useLS(lsKeys.searchStr);

  const [searchParams, setSearchParams] = useSearchParams();

  const detailsParam = searchParams.get(SearchParams.DETAILS);
  const pageParam = searchParams.get(SearchParams.PAGE);

  const [trigger, queryStatus] = useLazyGetCharactersQuery();

  useEffect(() => {
    trigger(
      { pageNumber: +(searchParams.get(SearchParams.PAGE) ?? defaultPage), searchString: searchString ?? '' },
      false,
    );
  }, [pageParam]);

  useEffect(() => {
    setSearchParams({ page: searchParams.get(SearchParams.PAGE) || String(defaultPage) });

    trigger(
      { pageNumber: +(searchParams.get(SearchParams.PAGE) ?? defaultPage), searchString: searchString ?? '' },
      false,
    );
  }, []);

  useEffect(() => {
    dispatch(setSearchString(searchString ?? ''));
  }, [searchString]);

  return (
    <>
      <Header>
        <SearchInput
          isSearchDisabled={queryStatus.isLoading || queryStatus.isFetching}
          onSearchClick={(searchString) => {
            setSearchParams({ page: String(defaultPage) });
            setSearchStringToLs(searchString);
            dispatch(setCurrentPage(defaultPage));
            trigger({ pageNumber: defaultPage, searchString });
          }}
        />
      </Header>

      <div className={styles.sectionsWrapper}>
        <Content
          showEmptyRespNotification={!queryStatus.data?.results.length}
          persons={queryStatus.data?.results ?? []}
          onCardSelect={(card) => {
            setSearchParams({
              page: searchParams.get(SearchParams.PAGE) || String(defaultPage),
              details: String(card),
            });
          }}
        >
          {queryStatus.data?.info.count ? (
            <Pagination
              currentPage={+(searchParams.get(SearchParams.PAGE) || defaultPage)}
              pages={queryStatus.data.info.pages}
              maxPageCells={3}
              onPageChange={(page) => {
                setSearchParams({ page: String(page) });
                dispatch(setCurrentPage(page));
                trigger({ searchString: searchString || '', pageNumber: page }, false);
              }}
            />
          ) : undefined}
        </Content>
        <FlyOut></FlyOut>

        {detailsParam && <Outlet />}
      </div>
    </>
  );
}

export default Main;
