import { baseUrl } from '@/constants';
import { Pokemon } from '@/types';

function getPokemon(name: string): Promise<Pokemon> {
  return fetch(`${baseUrl}pokemon/${name}`).then((r) => {
    return r.json();
  });
}

export async function getPokemons(searchString?: string): Promise<Pokemon[]> {
  let url = `${baseUrl}pokemon`;
  if (searchString) {
    url += `/${searchString}`;
  } else {
    url += '?limit=20&offset=20';
  }

  try {
    const resp = await fetch(url);
    if (resp.status === 404) {
      return [];
    }

    const r: Pokemon | { results: { name: string; url: string } }[] = await resp.json();

    if ('results' in r && Array.isArray(r.results)) {
      return Promise.all(r.results.map(({ name }) => getPokemon(name)));
    } else {
      return [r] as Pokemon[];
    }
  } catch (e) {
    return [];
  }
}
