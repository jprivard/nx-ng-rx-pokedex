import { createSelector } from "@ngrx/store";

import * as fromModule from '../reducers/index';

export const selectPokemonState = createSelector(fromModule.selectPokedexModuleState, state => state.pokemon);

export const selectList = createSelector(selectPokemonState, state => state.list);
