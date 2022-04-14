import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { ReformatPipe } from '../../pipes/reformat.pipe';
import { AbilitiesComponent } from './abilities.component';

describe('Abilities Component', () => {
  it('creates the abilities component', () => {
    expect(component).toBeTruthy();
  });

  it('shows as many list item as there are abilities', () => {
    spectator.component.abilities = ['hp', 'special-attack'];
    spectator.detectChanges();
    expect(elements.items().length).toEqual(2);
    expect(elements.items()[0].innerHTML).toContain('HP');
    expect(elements.items()[1].innerHTML).toContain('Special Attack');
  });

  let spectator: Spectator<AbilitiesComponent>;
  let component: AbilitiesComponent;
  const createComponent = createComponentFactory({
    component: AbilitiesComponent,
    shallow: true,
    declarations: [ReformatPipe]
  });
  const elements = { items: () => spectator.queryAll(byTestId('item')) };

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
