import { Component, Input } from "@angular/core";

@Component({
  selector: 'pokedex-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent {
  @Input() public types: string[] = [];
}
