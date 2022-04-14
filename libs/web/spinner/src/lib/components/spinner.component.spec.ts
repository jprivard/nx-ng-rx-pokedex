import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { SpinnerComponent } from './spinner.component';

describe('Spinner Component', () => {
  it('creates the spinner component', () => {
    expect(spectator).toBeTruthy();
  });

  it('has the proper element structure', () => {
    expect(spectator.query(byTestId('pokeball'))).toBeTruthy();
  });

  let spectator: Spectator<SpinnerComponent>;

  const createComponent = createComponentFactory({
    component: SpinnerComponent,
    shallow: true,
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
