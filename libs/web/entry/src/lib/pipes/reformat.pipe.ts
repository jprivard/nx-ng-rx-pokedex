import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reformat' })
export class ReformatPipe implements PipeTransform {
  public transform(text: string): string {
    return text.length < 3
      ? text.toLocaleUpperCase()
      : text.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
}
