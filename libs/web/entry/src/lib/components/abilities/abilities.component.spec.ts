import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { ReformatPipe } from '../../pipes/reformat.pipe';
import { AbilitiesComponent } from './abilities.component';

describe('Abilities Component', () => {
  it('creates the abilities component', () => {
    expect(spectator).toBeTruthy();
  });

  it('shows as many list item as there are abilities', () => {
    spectator.component.abilities = ['hp', 'special-attack'];
    spectator.detectChanges();
    const items = spectator.queryAll(byTestId('item'));
    expect(items.length).toEqual(2);
    expect(items[0].innerHTML).toContain('HP');
    expect(items[1].innerHTML).toContain('Special Attack');
  });

  let spectator: Spectator<AbilitiesComponent>;

  const createComponent = createComponentFactory({
    component: AbilitiesComponent,
    shallow: true,
    declarations: [ReformatPipe]
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
