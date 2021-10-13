import { createAction, props } from '@ngrx/store';
import { PokemonSummary } from '@pokedex/api-interfaces';

export const load = createAction('[Pokemon] Page Load', props<{ size: number, page: number }>());
export const loaded = createAction('[Pokemon] Page Loaded', props<{ list: PokemonSummary[] }>());
export const failed = createAction('[Pokemon] Failed', props<{ error: any }>());
