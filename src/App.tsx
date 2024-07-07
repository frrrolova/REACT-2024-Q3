import React, { ChangeEvent } from 'react';
import { getPokemons } from './services/pokemon.service';
import { Pokemon } from './types';

type ComponentState = {
  pokemons: Pokemon[];
  searchString: string;
  isSearchDisabled: boolean;
  showEmptyRespNotification: boolean;
};

class App extends React.Component<object, ComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
      searchString: localStorage.getItem('searchString') ?? '',
      isSearchDisabled: false,
      showEmptyRespNotification: false,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.getPokemons();
  }

  private async onSearchClick(): Promise<void> {
    localStorage.setItem('searchString', this.state.searchString);
    await this.getPokemons();
  }

  private async getPokemons(): Promise<void> {
    this.setState((state) => ({ ...state, isSearchDisabled: true, showEmptyRespNotification: false }));
    try {
      const pokemons = await getPokemons(this.state.searchString);

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
      <>
        <h2>Vite + React</h2>
        <div>
          <input
            defaultValue={this.state.searchString}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              this.setState((state) => ({ ...state, searchString: event.target.value }));
            }}
            type="search"
          />
          <button disabled={this.state.isSearchDisabled} onClick={this.onSearchClick} type="button">
            Search
          </button>
        </div>
        <div>
          <h1>results</h1>
          <ul>
            {this.state.showEmptyRespNotification && <div>No results</div>}
            {this.state.pokemons.map((pokemon: Pokemon) => (
              <div key={pokemon.name}>{pokemon.name}</div>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default App;
