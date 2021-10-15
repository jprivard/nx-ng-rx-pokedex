import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures } from '@pokedex/store/pokedex';
import { TableComponent } from './table.component';

describe('Table Component', () => {
  it('creates the table component', () => {
    expect(component).toBeTruthy();
  });

  it('displays data', async () => {
    component.pokemon = fixtures.summary;
    fixture.detectChanges();
    const content = await (await element.table()).getCellTextByColumnName();
    expect(content.id.headerText).toEqual([ '#' ]);
    expect(content.id.text).toEqual([ '1', '2', '3' ]);
    expect(content.sprite.headerText).toEqual([ '' ]);
    expect(content.sprite.text).toEqual([ '', '', '' ]);
    expect(content.name.headerText).toEqual([ 'Name' ]);
    expect(content.name.text).toEqual([ 'Bulbasaur', 'Ivysaur', 'Venusaur' ]);
    expect(content.types.headerText).toEqual([ 'Type(s)' ]);
    expect(content.types.text).toEqual([ 'Grass/Poison', 'Grass/Poison', 'Grass/Poison' ]);
  });

  it('contains images in Sprite column', async () => {
    component.pokemon = fixtures.summary;
    fixture.detectChanges();
    expect((await element.spriteOfRow(0))).toContain('background-image: url(http://img/1);');
    expect((await element.spriteOfRow(1))).toContain('background-image: url(http://img/2);');
    expect((await element.spriteOfRow(2))).toContain('background-image: url(http://img/3);');
  });

  it('contains a link to specific pokemon page in name column', async () => {
    component.pokemon = fixtures.summary;
    fixture.detectChanges();
    expect((await element.linkOfRow(0))?.getAttribute('href')).toEqual('/pokemon/bulbasaur');
    expect((await element.linkOfRow(0))?.innerHTML).toEqual('Bulbasaur');
    expect((await element.linkOfRow(1))?.getAttribute('href')).toEqual('/pokemon/ivysaur');
    expect((await element.linkOfRow(1))?.innerHTML).toEqual('Ivysaur');
    expect((await element.linkOfRow(2))?.getAttribute('href')).toEqual('/pokemon/venusaur');
    expect((await element.linkOfRow(2))?.innerHTML).toEqual('Venusaur');
  });

  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;
  let element: ComponentDSL<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [ MatTableModule, RouterTestingModule.withRoutes([]) ],
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<TableComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  spriteOfRow = async (row: number) => (await this.host(row, 1)).element.querySelector('.center-cropped')?.getAttribute('style');
  linkOfRow = async (row: number) => await (await this.host(row, 2)).element.querySelector('a');
}
