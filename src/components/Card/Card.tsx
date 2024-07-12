import styles from './Card.module.scss';
import { Characters } from '@/types';

interface CardProps {
  person: Characters;
}

function Card({ person }: CardProps) {
  const { name, image, species, gender, type, status } = person;
  return (
    <li className={styles.card}>
      <div className={styles.img}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.cardStat}>
          <span className={styles.attributeName}>Species:</span>
          <span>{species}</span>
        </p>
        <p className={styles.cardStat}>
          <span className={styles.attributeName}>Gender:</span>
          <span>{gender}</span>
        </p>
        {Boolean(type) && (
          <p className={styles.cardStat}>
            <span className={styles.attributeName}>Type:</span>
            <span>{type}</span>
          </p>
        )}
        <p className={styles.cardStat}>
          <span className={styles.attributeName}>Status:</span>
          <span>{status}</span>
        </p>
      </div>
    </li>
  );
}

export default Card;
