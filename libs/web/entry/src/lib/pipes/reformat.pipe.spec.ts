import { ReformatPipe } from './reformat.pipe';

describe('Reformat Pipe', () => {
  it('returns a string shorter than 3 characters all in caps', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('hp')).toEqual('HP');
  });

  it('returns a one-word string capitalized', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('defense')).toEqual('Defense');
  });

  it('separates each words and capitalizes all of them', () => {
    const pipe = new ReformatPipe();
    expect(pipe.transform('special-attack')).toEqual('Special Attack');
  });
});
