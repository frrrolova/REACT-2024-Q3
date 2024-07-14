import styles from './Card.module.scss';
import { Character } from '@/types';

interface CardProps {
  person: Character;
  onCardClick: (card: number) => void;
}

function Card({ person, onCardClick }: CardProps) {
  const { name, image } = person;
  return (
    <li
      className={styles.card}
      onClick={() => {
        onCardClick(person.id);
      }}
      role="person-card"
      data-testid={`person-card${person.id}`}
    >
      <div className={styles.img}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title} data-testid="card-title">
          {name}
        </h3>
      </div>
    </li>
  );
}

export default Card;
