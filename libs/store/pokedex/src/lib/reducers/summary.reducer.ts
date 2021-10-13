import { Action, createReducer, on } from "@ngrx/store";

import { PokemonSummary } from '../models/pokemon-summary.interface';
import { SummaryActions } from "../actions";
import { ProcessStatus } from '../enums/process-status.enum';
import { Process } from '../interfaces/process.interface';

export interface State {
  list: PokemonSummary[];
  process: Process;
}

export const initialState: State = {
  list: [],
  process: {
    status: ProcessStatus.normal,
    error: null
  }
}

const summaryReducer = createReducer(
  initialState,
  on(SummaryActions.load, () => ({ ...initialState,
    process: { ...initialState.process, status: ProcessStatus.loading }
  })),
  on(SummaryActions.loaded, (state, { list }) => ({ ...state,
    list,
    process: { ...initialState.process, status: ProcessStatus.completed }
  })),
  on(SummaryActions.failed, (state, { error }) => ({ ...state,
    process: { ...initialState.process, error, status: ProcessStatus.failed }
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return summaryReducer(state, action);
};
