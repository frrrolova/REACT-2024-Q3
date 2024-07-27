import { Character } from '@/types';

export function downloadCsv(characters: Character[]) {
  const csvFormattedCharacters = getCsvFormattedCharacters(characters);

  const csvDataBlob = new Blob([csvFormattedCharacters], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvDataBlob);

  // create fake link and bind it to blob url
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = `rick_and_morty_${characters.length}_characters_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getCsvFormattedCharacters(characters: Character[]): string {
  let result = '';

  const characterKeys: Array<keyof Character> = ['id', 'name', 'gender', 'image', 'status'];

  // Header row
  result += '#,';
  characterKeys.forEach((key, i) => {
    result += key;
    if (i === characterKeys.length - 1) {
      result += '\r\n';
    } else {
      result += ',';
    }
  });

  characters.forEach((c, cInd) => {
    result += `${cInd + 1},`;
    characterKeys.forEach((key, i) => {
      result += c[key] ?? '';
      if (i === characterKeys.length - 1) {
        result += '\r\n';
      } else {
        result += ',';
      }
    });
  });

  return result;
}
