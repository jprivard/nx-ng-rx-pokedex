import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { QuoteComponent } from './quote.component';

describe('Quote Component', () => {
  it('creates the quote component', () => {
    expect(component).toBeTruthy();
  });

  it('selects randomly a text from the list of texts received', () => {
    random.mockReturnValue(0.5);
    component.quotes = ['First', 'Second', 'Third'];
    fixture.detectChanges();
    expect(element.quote().innerHTML).toContain('Second');
    expect(element.quotee().innerHTML).toContain('Pokédex');
  });

  let fixture: ComponentFixture<QuoteComponent>;
  let component: QuoteComponent;
  let element: ComponentDSL<QuoteComponent>;
  const random = jest.spyOn(global.Math, 'random');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ QuoteComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<QuoteComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  quote = () => this.element('h3');
  quotee = () => this.element('div');
}
