import { Component, Input } from "@angular/core";

@Component({
  selector: 'pokedex-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent {
  @Input() public abilities: string[] = [];
}
