export interface PokemonApiResponse {
  id: number;
  name: string;
  species: {
    url: string;
    name: string;
  };
  sprites: {
    back_female: string;
    back_shiny_female: string;
    back_default: string;
    front_female: string;
    front_shiny_female: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
}
