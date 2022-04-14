import { BehaviorSubject, of } from 'rxjs';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockProvider, MockProviders } from 'ng-mocks';
import { fixtures, PokedexFacade } from '@pokedex/store/pokedex';
import { EntryPage } from './entry.page';
import { PokemonDetails } from '@pokedex/store/pokedex';
import { SpinnerComponent } from 'libs/web/spinner/src/lib/components/spinner.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

describe('Entry Page', () => {
  it('creates the entry page', () => {
    expect(spectator).toBeTruthy();
  });

  it('displays a spinner when the pokemon is loading', () => {
    loading.next(true);
    spectator.detectChanges();
    expect(spectator.query(SpinnerComponent)).toBeTruthy();
    expect(spectator.query(LayoutComponent)).toBeFalsy();
    expect(spectator.query(NotFoundComponent)).toBeFalsy();
  });

  it('does not display a spinner when the pokemon load is completed', () => {
    loading.next(false);
    spectator.detectChanges();
    expect(spectator.query(SpinnerComponent)).toBeFalsy();
  });

  it('displays a not found component when there was an error', () => {
    error.next(true);
    spectator.detectChanges();
    expect(spectator.query(NotFoundComponent)).toBeTruthy();
  });

  it('sends the Pokemon to the Layout and Header components', () => {
    pokemon.next(fixtures.details[0]);
    spectator.detectChanges();
    expect(spectator.query(LayoutComponent)).toBeTruthy();
    expect(spectator.query(LayoutComponent)!.pokemon).toEqual(fixtures.details[0]);
    expect(spectator.query(HeaderComponent)).toBeTruthy();
    expect(spectator.query(HeaderComponent)!.pokemon).toEqual(fixtures.details[0]);
  });

  it('asks the facade to load the details on startup', () => {
    expect(spectator.inject(PokedexFacade).loadPokemon).toHaveBeenCalledWith('bulbasaur');
  });

  let spectator: Spectator<EntryPage>;
  const pokemon = new BehaviorSubject<PokemonDetails | null>(null);
  const loading = new BehaviorSubject<boolean>(false);
  const error = new BehaviorSubject<boolean>(false);

  const createComponent = createComponentFactory({
    component: EntryPage,
    shallow: true,
    declarations: [ MockComponents(SpinnerComponent, LayoutComponent, NotFoundComponent, HeaderComponent) ],
    providers: [ 
      MockProvider(PokedexFacade, {
        pokemon: () => pokemon.asObservable(),
        isPokemonLoading: () => loading.asObservable(),
        isPokemonError: () => error.asObservable(),
      }),
      { provide: ActivatedRoute, useValue: { params: of({ id: 'bulbasaur' }) } },
    ],
  });

  beforeEach(async () => {
    loading.next(false);
    error.next(false);
    pokemon.next(null);
    spectator = createComponent();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
