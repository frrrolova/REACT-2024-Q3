import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokemon.service';
import { Characters } from './types';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchInput from './components/SearchInput/SearchInput';

function App() {
  const [persons, setPersons] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyRespNotification, setShowEmptyRespNotification] = useState(false);

  useEffect(() => {
    fetchPokemons(localStorage.getItem('searchString') ?? '');
  }, []);

  const fetchPokemons = async (searchString: string = ''): Promise<void> => {
    setIsLoading(true);
    setShowEmptyRespNotification(true);
    getPokemons(searchString)
      .then((fetchedData) => {
        setPersons(fetchedData.results);
        setShowEmptyRespNotification(!fetchedData.results.length);
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
    <ErrorBoundary>
      <Header>
        <SearchInput
          isSearchDisabled={isLoading}
          onSearchClick={(searchString) => {
            fetchPokemons(searchString);
          }}
        />
      </Header>
      <Content showEmptyRespNotification={showEmptyRespNotification} persons={persons} isLoading={isLoading} />
    </ErrorBoundary>
  );
}

export default App;
