import { SpeciesApiResponse } from '../interfaces/species.interface';

export const species = [
  {
    id: 1,
    name: 'bulbasaur',
    flavor_text_entries: [
      { flavor_text: 'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.', language: { name: 'en' } },
      { flavor_text: 'Allo!', language: { name: 'fr' } }
    ],
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    evolution_chain: { url: 'http://evochain.url/bulbasaur' }
  }
] as SpeciesApiResponse[];
