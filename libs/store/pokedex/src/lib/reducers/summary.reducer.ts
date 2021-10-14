import { Action, createReducer, on } from "@ngrx/store";

import { PokemonSummary } from '../interfaces/pokemon-summary.interface';
import { ProcessStatus } from '../enums/process-status.enum';
import { Process } from '../interfaces/process.interface';
import { SummaryActions } from "../actions";

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
  /*
    @TODO Apparently, we need to comment everything within these lines to run the
    lint, as there are problems with the rules that need more time to look into.
  */
  on(SummaryActions.load, () => ({ ...initialState,
    process: { ...initialState.process, status: ProcessStatus.loading }
  })),
  on(SummaryActions.loaded, (state, { list }) => ({ ...state,
    list,
    process: { ...initialState.process, status: ProcessStatus.completed }
  })),
  on(SummaryActions.failed, (state, { error }) => ({ ...state,
    process: { ...initialState.process, error, status: ProcessStatus.failed }
  }))
  /* End of Comment for linting */
);

export function reducer(state: State | undefined, action: Action) {
  return summaryReducer(state, action);
};
