import { SpeciesApiResponse } from '@pokedex/api-interfaces';

export const species = [
  {
    id: 1,
    name: 'bulbusaur',
    flavor_text_entries: [
      { flavor_text: 'Hello!', language: { name: 'en' } },
      { flavor_text: 'Allo!', language: { name: 'fr' } }
    ],
    evolution_chain: { url: 'http://evochain.url/bulbusaur' }
  }
] as SpeciesApiResponse[];
