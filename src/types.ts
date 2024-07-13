export interface PaginatedResponse<T> {
  results: T[];
  info: {
    pages: number;
    count: number;
  };
}

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  type: string;
  location: {
    name: string;
  };
}

export type CharactersResponse = PaginatedResponse<Character>;
