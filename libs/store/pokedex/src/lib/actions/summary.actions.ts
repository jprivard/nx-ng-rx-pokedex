import { createAction, props } from '@ngrx/store';
import { PokemonSummary } from '../models/pokemon-summary.interface';

export const load = createAction('[Pokemon] Page Load', props<{ size: number, page: number }>());
export const loaded = createAction('[Pokemon] Page Loaded', props<{ list: PokemonSummary[] }>());
export const failed = createAction('[Pokemon] Failed', props<{ error: Error }>());
