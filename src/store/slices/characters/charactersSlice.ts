import { Character } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartState {
  currentPage: number;
  searchString: string;
  selectedCharacters: Character[];
}

export const initialState: CartState = {
  currentPage: 1,
  searchString: '',
  selectedCharacters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters.push(action.payload);
    },
    unselectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters.splice(
        state.selectedCharacters.findIndex((c) => c.id === action.payload.id),
        1,
      );
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { setCurrentPage, setSearchString, selectCharacter, unselectCharacter, unselectAll } =
  charactersSlice.actions;

export default charactersSlice;
