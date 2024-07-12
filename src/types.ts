export interface PaginatedResponse<T> {
  results: T[];
  info: {
    pages: number;
    count: number;
  };
}

export interface Characters {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  type: string;
}

export type CharactersResponse = PaginatedResponse<Characters>;
