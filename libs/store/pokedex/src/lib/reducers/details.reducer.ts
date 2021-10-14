import { Action, createReducer, on } from "@ngrx/store";

import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { ProcessStatus } from '../enums/process-status.enum';
import { Process } from '../interfaces/process.interface';
import { DetailsActions } from "../actions";

export interface State {
  pokemon: PokemonDetails | null;
  process: Process;
}

export const initialState: State = {
  pokemon: null,
  process: {
    status: ProcessStatus.normal,
    error: null
  }
}

const detailsReducer = createReducer(
  initialState,
  /*
    @TODO Apparently, we need to comment everything within these lines to run the
    lint, as there are problems with the rules that need more time to look into.
  */
  on(DetailsActions.load, () => ({ ...initialState,
    process: { ...initialState.process, status: ProcessStatus.loading }
  })),
  on(DetailsActions.loaded, (state, { pokemon }) => ({ ...state,
    pokemon,
    process: { ...initialState.process, status: ProcessStatus.completed }
  })),
  on(DetailsActions.failed, (state, { error }) => ({ ...state,
    process: { ...initialState.process, error, status: ProcessStatus.failed }
  })),
  /* End of Comment for linting */
);

export function reducer(state: State | undefined, action: Action) {
  return detailsReducer(state, action);
};
