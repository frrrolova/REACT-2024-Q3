import React from 'react';
import { Pokemon } from '@/types';
// import styles from './Content.module.scss';

interface ContentProps {
  showEmptyRespNotification: boolean;
  pokemons: Pokemon[];
}

class Content extends React.Component<ContentProps> {
  constructor(props: ContentProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Results</h1>
        <ul>
          {this.props.showEmptyRespNotification && <div>No results</div>}
          {this.props.pokemons.map((pokemon: Pokemon) => (
            <div key={pokemon.name}>{pokemon.name}</div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Content;
