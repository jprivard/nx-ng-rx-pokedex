import { createFeatureSelector } from '@ngrx/store';
import * as pokemon from './pokemon.reducer';

export interface PokedexModuleState {
  pokemon: pokemon.State;
}

export const FEATURE_KEY = 'pokedex';

export interface State {
  [FEATURE_KEY]: PokedexModuleState;
}

export const reducers = {
  pokemon: pokemon.reducer,
}

export const initialState: PokedexModuleState = {
  pokemon: pokemon.initialState,
}

export const getPokedexModuleState = createFeatureSelector<PokedexModuleState>(FEATURE_KEY);

export { pokemon };
