import styles from './Card.module.scss';
import { Character } from '@/types';
import { selectedCharactersSelector } from '@/store/slices/characters/selectors';
import { useAppDispatch } from '@/store/store';
import { selectCharacter, unselectCharacter } from '@/store/slices/characters/charactersSlice';
import { useEffect, useState } from 'react';

interface CardProps {
  person: Character;
  onCardClick: (card: number) => void;
}

function Card({ person, onCardClick }: CardProps) {
  const { name, image } = person;
  const dispatch = useAppDispatch();
  const selectedCharacters = selectedCharactersSelector();

  const [isChecked, setIsChecked] = useState(Boolean(selectedCharacters.find((c) => c.id === person.id)));

  const checkHandler = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (newState) {
      dispatch(selectCharacter(person));
    } else {
      dispatch(unselectCharacter(person));
    }
  };

  useEffect(() => {
    setIsChecked(Boolean(selectedCharacters.find((c) => c.id === person.id)));
  }, [selectedCharacters]);

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
        <input
          id={`character-selector-${person.id}`}
          type="checkbox"
          className={styles.chk}
          onClick={(e) => {
            e.stopPropagation();
          }}
          checked={isChecked}
          onChange={checkHandler}
        />
      </div>
    </li>
  );
}

export default Card;
