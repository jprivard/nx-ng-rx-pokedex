import { PokemonType } from './pokemon-type.interface';
import { Species } from './species.interface';
import { Sprite } from './sprite.interface';

export interface Pokemon {
  id: number;
  name: string;
  species: Species;
  sprites: Sprite;
  types: PokemonType[];
}
