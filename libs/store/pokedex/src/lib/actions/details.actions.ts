import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';

export const load = createAction('[Pokemon] Details Load', props<{ name: string }>());
export const loaded = createAction('[Pokemon] Details Loaded', props<{ pokemon: PokemonDetails }>());
export const failed = createAction('[Pokemon] Details Failed', props<{ error: Error }>());
