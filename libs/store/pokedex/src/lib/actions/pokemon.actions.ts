import { createAction, props } from '@ngrx/store';
import { Pokemon } from '@pokedex/api-interfaces';

export const initialize = createAction('[Pokemon] Initialize');
export const load = createAction('[Pokemon] Load', props<{ id: number }>());
export const loaded = createAction('[Pokemon] Loaded', props<{ pokemon: Pokemon }>());
export const failed = createAction('[Pokemon] Failed', props<{ error: any }>());
export const initialized = createAction('[Pokemon] Initialized');
