import { baseUrl } from '@/constants';
import { Character, CharactersResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
    }),
    getCharacters: builder.query<CharactersResponse, { pageNumber: number; searchString?: string }>({
      query: ({ searchString, pageNumber }) => {
        let url = `character?page=${pageNumber}`;
        if (searchString) {
          url += `&name=${searchString}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery, useLazyGetCharactersQuery } = rickAndMortyApi;
