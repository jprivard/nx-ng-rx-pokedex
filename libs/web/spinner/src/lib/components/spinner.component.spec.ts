import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { SpinnerComponent } from './spinner.component';

describe('Spinner Component', () => {
  it('creates the spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('has the proper element structure', () => {
    expect(elements.pokeball()).toBeTruthy();
  });

  let spectator: Spectator<SpinnerComponent>;
  let component: SpinnerComponent;
  const elements = { pokeball: () => spectator.query(byTestId('pokeball')) };
  const createComponent = createComponentFactory({ component: SpinnerComponent, shallow: true });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
