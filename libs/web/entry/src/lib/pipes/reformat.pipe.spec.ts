import { ReformatPipe } from './reformat.pipe';

describe('Reformat Pipe', () => {
  test('returns a string shorter than 3 characters all in caps', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('hp')).toEqual('HP');
  });

  test('returns a one-word string capitalized', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('defense')).toEqual('Defense');
  });

  test('separates each words and capitalizes all of them', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('special-attack')).toEqual('Special Attack');
  });
});
