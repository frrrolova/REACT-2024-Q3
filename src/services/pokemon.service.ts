import { baseUrl } from '@/constants';
import { CharactersResponse } from '@/types';

export async function getPokemons(searchString?: string): Promise<CharactersResponse> {
  let url = baseUrl + '/character';
  if (searchString) {
    url += `&name=${searchString}`;
  }

  return await (await fetch(url)).json();
}
