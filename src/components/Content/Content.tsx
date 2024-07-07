import React from 'react';
import { Pokemon } from '@/types';
import Card from '../Card/Card';
import styles from './Content.module.scss';
import ballImg from '/img/pokeball.webp';

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
        <h1 className={styles.title}>
          Results <img className={styles.titleImg} src={ballImg} alt="ball" />
        </h1>
        <ul className={styles.list}>
          {this.props.showEmptyRespNotification && <div>No results</div>}
          {this.props.pokemons.map((pokemon: Pokemon) => (
            <Card
              key={pokemon.name}
              imgPath={pokemon.sprites.other['official-artwork'].front_default}
              name={pokemon.name}
              weight={pokemon.weight}
              height={pokemon.height}
              stats={pokemon.stats}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Content;
