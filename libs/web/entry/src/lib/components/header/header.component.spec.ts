import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures } from '@pokedex/store/pokedex';
import { HeaderComponent } from './header.component';

describe('Header Component', () => {
  it('creates the header component', () => {
    expect(component).toBeTruthy();
  });

  it('displays no name when there are no pokemon received', () => {
    expect(element.name()).toBeFalsy();
  });

  it('displays id number and name when pokemon is received', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.name()).toContain('#1 Bulbasaur');
  });

  it('displays a link to go back to pokemon list', () => {
    fixture.detectChanges();
    expect(element.link().innerHTML).toContain('To list');
    expect(element.link().getAttribute('href')).toEqual('/pokemon');
  });

  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let element: ComponentDSL<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ HeaderComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<HeaderComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  name = () => this.element('.name span')?.innerHTML;
  link = () => this.element('a') as HTMLAnchorElement;
}
