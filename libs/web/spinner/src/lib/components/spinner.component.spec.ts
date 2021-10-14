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
  let element: ComponentDSL;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL extends ComponentInspector {
  spinner = () => this.element('.pokeball .pokeball__button');
}
