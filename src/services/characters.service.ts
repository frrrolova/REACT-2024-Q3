import { baseUrl } from '@/constants';
import { Character, CharactersResponse } from '@/types';

export async function getCharacters(searchString?: string, pageQuery: string = ''): Promise<CharactersResponse> {
  let url = baseUrl + `/character?page=${pageQuery}`;
  if (searchString) {
    url += `&name=${searchString}`;
  }

  return await (await fetch(url)).json();
}

export async function getSingleCharacter(id: number): Promise<Character> {
  const url = baseUrl + `/character/${id}`;

  return await (await fetch(url)).json();
}
