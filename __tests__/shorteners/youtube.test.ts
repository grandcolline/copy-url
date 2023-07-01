import { Youtube } from '../../src/shorteners/youtube';
import { Shortener, URLToBeShorten } from '../../src/shorteners/shortener';

describe('Youtube shortener', () => {
  let url: URL;
  let shortener: Shortener;

  beforeEach(() => {
    url = new URL('https://www.youtube.com/watch?v=ABCDEFGHIJK');
    shortener = new Youtube();
  });

  test('can shorten', () => {
    expect(shortener.canShorten(url)).toBe(true);
  });

  test('can not shorten because of unacceptable hostname', () => {
    url.hostname = 'example.com';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('can not shorten because of unacceptable pathname', () => {
    url.pathname = '/a/ABCDEFGHIJK';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('should shorten url', () => {
    const shortened = shortener.shorten(new URLToBeShorten(url));
    expect(shortened.decode()).toBe('https://youtu.be/ABCDEFGHIJK');
  });
});
