import { createFeatureSelector } from '@ngrx/store';
import * as summary from './summary.reducer';
import * as details from './details.reducer';

export interface PokedexModuleState {
  summary: summary.State;
  details: details.State;
}

export const FEATURE_KEY = 'pokedex';

export interface State {
  [FEATURE_KEY]: PokedexModuleState;
}

export const reducers = {
  summary: summary.reducer,
  details: details.reducer,
}

export const initialState: PokedexModuleState = {
  summary: summary.initialState,
  details: details.initialState,
}

export const selectPokedexModuleState = createFeatureSelector<PokedexModuleState>(FEATURE_KEY);

export { summary, details };
