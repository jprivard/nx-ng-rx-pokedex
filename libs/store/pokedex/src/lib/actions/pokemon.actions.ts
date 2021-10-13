import { createAction, props } from '@ngrx/store';
import { Pokemon } from '@pokedex/api-interfaces';

export const load = createAction('[Pokemon] Page Load', props<{ size: number, page: number }>());
export const loaded = createAction('[Pokemon] Page Loaded', props<{ list: Pokemon[] }>());
export const failed = createAction('[Pokemon] Failed', props<{ error: any }>());
