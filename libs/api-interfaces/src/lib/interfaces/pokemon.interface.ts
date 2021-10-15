export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  }
}

export interface PokemonApiResponse {
  id: number;
  abilities: {
    ability: {
      name: string;
    }
  }[];
  base_experience: number;
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
  stats: PokemonStat[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
}
