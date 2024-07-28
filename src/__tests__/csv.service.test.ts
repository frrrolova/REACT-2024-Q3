import { getManyCharacters } from './test-constants';
import { getCsvFormattedCharacters } from '@/services/csv.service';
const res = `#,id,name,gender,image,status\r\n1,0,Summer Smith,Female,https://rickandmortyapi.com/api/character/avatar/3.jpeg,Alive\r\n2,1,Summer Smith,Female,https://rickandmortyapi.com/api/character/avatar/3.jpeg,Alive\r\n`;

describe('csv.service', () => {
  test('should return csv string from characters', async () => {
    const result = getCsvFormattedCharacters(getManyCharacters(2));

    expect(result).toEqual(res);
  });

  test('should return csv string from characters', async () => {
    const result = getCsvFormattedCharacters(getManyCharacters(0));

    expect(result).toEqual(`#,id,name,gender,image,status\r\n`);
  });
});
