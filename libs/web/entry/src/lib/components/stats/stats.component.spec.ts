import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures } from '@pokedex/store/pokedex';
import { ReformatPipe } from '../../pipes/reformat.pipe';
import { StatsComponent } from './stats.component';

describe('Stats Component', () => {
  it('creates the stats component', () => {
    expect(component).toBeTruthy();
  });

  it('displays a table with pokemon stats', async () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    const content = await (await element.table()).getCellTextByColumnName();
    expect(content.name.text).toEqual([
      'Base Experience', 'HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'
    ]);
    expect(content.value.text).toEqual([ '64', '45', '49', '49', '65', '65', '45' ]);
  });

  let fixture: ComponentFixture<StatsComponent>;
  let component: StatsComponent;
  let element: ComponentDSL<StatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ StatsComponent, ReformatPipe ]
    }).compileComponents();
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<StatsComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {}
