import React from 'react';
import styles from './Card.module.scss';
import { StatItem } from '@/types';

interface CardProps {
  imgPath: string;
  name: string;
  weight: number;
  height: number;
  stats: StatItem[];
}

class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={this.props.imgPath} alt={this.props.name} />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{this.props.name}</h3>
          <p className={styles.cardAttribute}>
            <span className={styles.attributeName}>Weight:</span>
            <span>{this.props.weight}</span>
          </p>
          <p className={styles.cardAttribute}>
            <span className={styles.attributeName}>Height:</span>
            <span>{this.props.height}</span>
          </p>
          <div>
            <h4 className={styles.subtitle}>Stats</h4>
            {this.props.stats.map((stat) => {
              return (
                <p className={styles.cardStat} key={stat.stat.name}>
                  <span className={styles.attributeName}>{`${stat.stat.name}:`}</span>
                  <span>{stat.base_stat}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
