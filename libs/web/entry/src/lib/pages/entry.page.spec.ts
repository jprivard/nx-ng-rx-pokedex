import { BehaviorSubject, of } from 'rxjs';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents, MockProvider } from 'ng-mocks';
import { fixtures, PokedexFacade } from '@pokedex/store/pokedex';
import { EntryPage } from './entry.page';
import { PokemonDetails } from '@pokedex/store/pokedex';
import { SpinnerComponent } from 'libs/web/spinner/src/lib/components/spinner.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute } from '@angular/router';

describe('Entry Page', () => {
  it('creates the entry page', () => {
    expect(component).toBeTruthy();
  });

  it('displays a spinner when the pokemon is loading', () => {
    loading.next(true);
    spectator.detectChanges();
    expect(elements.spinner()).toBeTruthy();
    expect(elements.layout()).toBeFalsy();
    expect(elements.notFound()).toBeFalsy();
  });

  it('does not display a spinner when the pokemon load is completed', () => {
    loading.next(false);
    spectator.detectChanges();
    expect(elements.spinner()).toBeFalsy();
  });

  it('displays a not found component when there was an error', () => {
    error.next(true);
    spectator.detectChanges();
    expect(elements.notFound()).toBeTruthy();
  });

  it('sends the Pokemon to the Layout and Header components', () => {
    pokemon.next(fixtures.details[0]);
    spectator.detectChanges();
    expect(elements.layout()).toBeTruthy();
    expect(elements.layout().pokemon).toEqual(fixtures.details[0]);
    expect(elements.header()).toBeTruthy();
    expect(elements.header().pokemon).toEqual(fixtures.details[0]);
  });

  it('asks the facade to load the details on startup', () => {
    expect(elements.facade().loadPokemon).toHaveBeenCalledWith('bulbasaur');
  });

  let spectator: Spectator<EntryPage>;
  let component: EntryPage;
  const pokemon = new BehaviorSubject<PokemonDetails | null>(null);
  const loading = new BehaviorSubject<boolean>(false);
  const error = new BehaviorSubject<boolean>(false);
  const elements = {
    facade: () => spectator.inject(PokedexFacade),
    header: () => spectator.query(HeaderComponent)!,
    layout: () => spectator.query(LayoutComponent)!,
    notFound: () => spectator.query(NotFoundComponent)!,
    spinner: () => spectator.query(SpinnerComponent)!,
  }

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
      MockProvider(ActivatedRoute, { params: of({ id: 'bulbasaur' }) })
    ],
  });

  beforeEach(async () => {
    loading.next(false);
    error.next(false);
    pokemon.next(null);
    spectator = createComponent();
    component = spectator.component;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
