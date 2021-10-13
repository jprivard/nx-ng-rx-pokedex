import { createSelector } from "@ngrx/store";
import { ProcessStatus } from "../enums/process-status.enum";
import * as fromModule from '../reducers/index';

export const selectPokemonState = createSelector(fromModule.selectPokedexModuleState, state => state.pokemon);

export const selectList = createSelector(selectPokemonState, state => state.list.slice().sort((a, b) => a.id > b.id && 1 || -1));
export const selectLoading = createSelector(selectPokemonState, state => state.process.status === ProcessStatus.loading);
