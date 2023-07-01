import { StackOverflow } from '../../src/shorteners/stackoverflow';
import { Shortener, URLToBeShorten } from '../../src/shorteners/shortener';

describe('Stackoverflow shortener', () => {
  let url: URL;
  let shortener: Shortener;

  beforeEach(() => {
    url = new URL(
      'https://stackoverflow.com/questions/12345678/question-title'
    );
    shortener = new StackOverflow();
  });

  test('can shorten', () => {
    expect(shortener.canShorten(url)).toBe(true);
  });

  test('can not shorten because of unacceptable hostname', () => {
    url.hostname = 'example.com';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('can not shorten because of unacceptable pathname', () => {
    url.pathname = '/a/12345678/question-title';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('should shorten url', () => {
    const shortened = shortener.shorten(new URLToBeShorten(url));
    expect(shortened.decode()).toBe('https://stackoverflow.com/q/12345678');
  });
});
