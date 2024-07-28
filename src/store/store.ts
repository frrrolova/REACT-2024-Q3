import { rickAndMortyApi } from '@/services/characters.service';
import { StateFromReducersMapObject, combineReducers, configureStore } from '@reduxjs/toolkit';
import charactersSlice from './slices/characters/charactersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  characters: charactersSlice.reducer,
});

export const setupStore = (preloadedState?: StateFromReducersMapObject<typeof rootReducer>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
