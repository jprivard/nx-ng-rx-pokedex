import { Component, Input } from "@angular/core";

@Component({
  selector: 'pokedex-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
  public quote = '';
  @Input() set quotes(quotes: string[]) {
    this.quote = quotes[Math.floor(Math.random() * quotes.length)];
  }
}
