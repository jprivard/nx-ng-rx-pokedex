import { createSelector } from "@ngrx/store";
import { ProcessStatus } from "../enums/process-status.enum";
import * as fromModule from '../reducers/index';

export const selectSummaryState = createSelector(fromModule.selectPokedexModuleState, state => state.summary);
export const selectList = createSelector(selectSummaryState, state => state.list.slice().sort((a, b) => a.id > b.id && 1 || -1));
export const selectLoading = createSelector(selectSummaryState, state => state.process.status === ProcessStatus.loading);
