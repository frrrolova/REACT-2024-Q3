import { useAppSelector } from '@/store/store';

export const currentPageSelector = () => useAppSelector((state) => state.characters.currentPage);
export const currentSearchStringSelector = () => useAppSelector((state) => state.characters.searchString);
export const selectedCharactersSelector = () => useAppSelector((state) => state.characters.selectedCharacters);
