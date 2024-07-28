import { characterMock, getManyCharacters } from '@/__tests__/test-constants';
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/:id', () => {
    return HttpResponse.json({ ...characterMock }, { status: 200 });
  }),
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json(
      {
        info: {
          count: 599,
          pages: 30,
          next: 'https://rickandmortyapi.com/api/character?page=6&name=r',
          prev: 'https://rickandmortyapi.com/api/character?page=4&name=r',
        },
        results: getManyCharacters(2),
      },
      { status: 200 },
    );
  }),
];
