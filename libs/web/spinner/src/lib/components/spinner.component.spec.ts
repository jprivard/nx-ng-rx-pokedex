import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { SpinnerComponent } from './spinner.component';

describe('Spinner Component', () => {
  it('creates the spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('has the proper element structure', () => {
    expect(element.spinner()).toBeTruthy();
  });

  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;
  let element: ComponentDSL<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<SpinnerComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  spinner = () => this.element('.pokeball .pokeball__button');
}
