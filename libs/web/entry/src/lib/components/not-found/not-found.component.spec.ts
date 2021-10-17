import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { NotFoundComponent } from './not-found.component';

describe('Not-Found Component', () => {
  it('creates the not-found component', () => {
    expect(component).toBeTruthy();
  });

  it('contains a very confused psyduck', () => {
    fixture.detectChanges();
    expect(element.img().getAttribute('src')).toContain('/assets/img/psyduck.png');
    expect(element.title().innerHTML).toContain('Not Found ?!');
  });

  let fixture: ComponentFixture<NotFoundComponent>;
  let component: NotFoundComponent;
  let element: ComponentDSL<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<NotFoundComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  img = () => this.element('img');
  title = () => this.element('h1');
}
