import { createFeatureSelector } from '@ngrx/store';
import * as summary from './summary.reducer';

export interface PokedexModuleState {
  summary: summary.State;
}

export const FEATURE_KEY = 'pokedex';

export interface State {
  [FEATURE_KEY]: PokedexModuleState;
}

export const reducers = {
  summary: summary.reducer,
}

export const initialState: PokedexModuleState = {
  summary: summary.initialState,
}

export const selectPokedexModuleState = createFeatureSelector<PokedexModuleState>(FEATURE_KEY);

export { summary };
