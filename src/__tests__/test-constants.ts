import { Character, PaginatedResponse } from '@/types';

export const characterMock: Character = {
  id: 3,
  name: 'Summer Smith',
  gender: 'Female',
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  status: 'Alive',
  species: 'Human',
  type: 'type',
  location: {
    name: 'Earth (Replacement Dimension)',
  },
};
export const charactersMockWithOneCharacter: Character[] = [characterMock];
export const charactersMockWithMultipleCharacters: Character[] = [
  characterMock,
  { ...characterMock, id: 2 },
  { ...characterMock, id: 3 },
];

export const pageResponseMock: PaginatedResponse<Character> = {
  results: getManyCharacters(100),
  info: {
    pages: 3,
    count: 3,
  },
};

export const getPageMock = vi.fn().mockResolvedValue(pageResponseMock);
export const getSingleCharacterMock = vi.fn().mockResolvedValue(characterMock);

export function getManyCharacters(num: number): Character[] {
  const chars = [];
  for (let i = 0; i < num; i += 1) {
    chars.push({ ...characterMock, id: i });
  }
  return chars;
}
