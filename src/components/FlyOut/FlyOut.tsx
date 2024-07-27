import styles from './FlyOut.module.scss';

import { selectedCharactersSelector } from '@/store/slices/characters/selectors';

import { useAppDispatch } from '@/store/store';
import { unselectAll } from '@/store/slices/characters/charactersSlice';
import { downloadCsv } from '@/services/csv.service';

function FlyOut() {
  const selectedCharacters = selectedCharactersSelector();
  const dispatch = useAppDispatch();

  if (!selectedCharacters.length) {
    return '';
  }

  const handleUnselectAllClick = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCsv(selectedCharacters);
  };

  return (
    <div className={styles.flyOut}>
      <div>
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleUnselectAllClick}>Unselect All</button>
      </div>
    </div>
  );
}

export default FlyOut;
