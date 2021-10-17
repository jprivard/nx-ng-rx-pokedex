import { createSelector } from "@ngrx/store";
import { ProcessStatus } from "../enums/process-status.enum";
import * as fromModule from '../reducers/index';

export const selectDetailsState = createSelector(fromModule.selectPokedexModuleState, state => state.details);
export const selectPokemon = createSelector(selectDetailsState, state => state.pokemon);
export const selectLoading = createSelector(selectDetailsState, state => state.process.status === ProcessStatus.loading);
export const selectError = createSelector(selectDetailsState, state => state.process.status === ProcessStatus.failed);
