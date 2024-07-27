import { rickAndMortyApi } from '@/services/characters.service';
import { currentPageSelector, currentSearchStringSelector } from '@/store/slices/characters/selectors';

export function useGetCharactersResultWithLatestParams() {
  const currentPage = currentPageSelector();
  const currentSearchString = currentSearchStringSelector();
  return rickAndMortyApi.endpoints.getCharacters.useQueryState({
    pageNumber: currentPage,
    searchString: currentSearchString,
  });
}
