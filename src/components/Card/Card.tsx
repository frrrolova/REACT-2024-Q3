import styles from './Card.module.scss';
import { StatItem } from '@/types';

interface CardProps {
  imgPath: string;
  name: string;
  weight: number;
  height: number;
  stats: StatItem[];
}

function Card({ imgPath, name, weight, height, stats }: CardProps) {
  return (
    <li className={styles.card}>
      <div className={styles.img}>
        <img src={imgPath} alt={name} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.cardAttribute}>
          <span className={styles.attributeName}>Weight:</span>
          <span>{weight}</span>
        </p>
        <p className={styles.cardAttribute}>
          <span className={styles.attributeName}>Height:</span>
          <span>{height}</span>
        </p>
        <div>
          <h4 className={styles.subtitle}>Stats</h4>
          {stats.map((stat) => {
            return (
              <p className={styles.cardStat} key={stat.stat.name}>
                <span className={styles.attributeName}>{`${stat.stat.name}:`}</span>
                <span>{stat.base_stat}</span>
              </p>
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default Card;
