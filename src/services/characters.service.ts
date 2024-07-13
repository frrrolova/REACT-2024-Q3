import { baseUrl } from '@/constants';
import { CharactersResponse } from '@/types';

export async function getPokemons(searchString?: string, pageQuery: string = ''): Promise<CharactersResponse> {
  let url = baseUrl + `/character?page=${pageQuery}`;
  if (searchString) {
    url += `&name=${searchString}`;
  }

  return await (await fetch(url)).json();
}
