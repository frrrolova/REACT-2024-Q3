import { Character, PaginatedResponse } from '@/types';

export const characterMock: Character = {
  id: 1,
  name: 'name',
  image: 'path',
  species: 'species',
  gender: 'gender',
  status: 'status',
  type: 'type',
  location: {
    name: 'location',
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

function getManyCharacters(num: number): Character[] {
  const chars = [];
  for (let i = 0; i < num; i += 1) {
    chars.push({ ...characterMock, id: i });
  }
  return chars;
}
