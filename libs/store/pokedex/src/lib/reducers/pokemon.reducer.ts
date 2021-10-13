import { Action, createReducer, on } from "@ngrx/store";

import { Pokemon } from '@pokedex/api-interfaces';
import { PokemonActions } from "../actions";
import { ProcessStatus } from '../enums/process-status.enum';
import { Process } from '../interfaces/process.interface';

export interface State {
  list: Pokemon[];
  process: Process;
}

export const initialState: State = {
  list: [],
  process: {
    status: ProcessStatus.normal,
    error: null
  }
}

const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.initialize, () => ({ ...initialState,
    process: { ...initialState.process, status: ProcessStatus.loading }
  })),
  on(PokemonActions.loaded, (state, { pokemon }) => ({ ...state,
    list: [ ...state.list, pokemon ],
  })),
  on(PokemonActions.failed, (state, { error }) => ({ ...state,
    process: { ...initialState.process, error, status: ProcessStatus.failed }
  })),
  on(PokemonActions.initialized, state => ({ ...state,
    process: { ...state.process, status: ProcessStatus.completed }
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return pokemonReducer(state, action);
};
