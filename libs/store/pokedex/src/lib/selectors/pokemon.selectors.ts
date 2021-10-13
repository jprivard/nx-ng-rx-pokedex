import { createSelector } from "@ngrx/store";

import * as fromModule from '../reducers/index';

export const getPokemonState = createSelector(fromModule.getPokedexModuleState, state => state.pokemon);

export const list = createSelector(getPokemonState, state => state.list);
