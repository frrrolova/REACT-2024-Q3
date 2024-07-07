import React from 'react';
import { getPokemons } from './services/pokemon.service';
import { Pokemon } from './types';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

type ComponentState = {
  pokemons: Pokemon[];
  isSearchDisabled: boolean;
  showEmptyRespNotification: boolean;
};

class App extends React.Component<object, ComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
      isSearchDisabled: false,
      showEmptyRespNotification: false,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.getPokemons(localStorage.getItem('searchString') ?? '');
  }

  private async getPokemons(searchString: string = ''): Promise<void> {
    this.setState((state) => ({ ...state, isSearchDisabled: true, showEmptyRespNotification: false }));
    try {
      const pokemons = await getPokemons(searchString);

      this.setState((state) => {
        return { ...state, pokemons, isSearchDisabled: false, showEmptyRespNotification: !pokemons.length };
      });
    } catch (e) {
      this.setState((state) => {
        return { ...state, pokemons: [], showEmptyRespNotification: true, isSearchDisabled: false };
      });
    }
  }

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <Header
          isSearchDisabled={this.state.isSearchDisabled}
          onSearch={(searchString) => {
            this.getPokemons(searchString);
          }}
        />
        <Content showEmptyRespNotification={this.state.showEmptyRespNotification} pokemons={this.state.pokemons} />
      </ErrorBoundary>
    );
  }
}

export default App;
