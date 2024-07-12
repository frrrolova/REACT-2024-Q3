import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokemon.service';
import { Pokemon } from './types';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchInput from './components/SearchInput/SearchInput';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyRespNotification, setShowEmptyRespNotification] = useState(false);

  useEffect(() => {
    fetchPokemons(localStorage.getItem('searchString') ?? '');
  }, []);

  const fetchPokemons = async (searchString: string = ''): Promise<void> => {
    setIsLoading(true);
    setShowEmptyRespNotification(true);
    try {
      const pokemons = await getPokemons(searchString);
      setPokemons(pokemons);
      setIsLoading(false);
      setShowEmptyRespNotification(!pokemons.length);
    } catch (e) {
      setPokemons([]);
      setIsLoading(false);
      setShowEmptyRespNotification(true);
    }
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
      <Content showEmptyRespNotification={showEmptyRespNotification} pokemons={pokemons} isLoading={isLoading} />
    </ErrorBoundary>
  );
}

export default App;
