import { Amazon } from '../../src/shorteners/amazon';
import { Shortener, URLToBeShorten } from '../../src/shorteners/shortener';

describe('Amazon shortener', () => {
  let url: URL;
  let shortener: Shortener;

  beforeEach(() => {
    url = new URL(
      'https://www.amazon.co.jp/%E5%95%86%E5%93%81/dp/ABCDE12345?ref_=123&pd_rd_w=aaaa&content-id=bbbb'
    );
    shortener = new Amazon();
  });

  test('can shorten', () => {
    expect(shortener.canShorten(url)).toBe(true);
  });

  test('can not shorten because of unacceptable hostname', () => {
    url.hostname = 'example.com';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('can not shorten because of unacceptable pathname', () => {
    url.pathname = '/a/B07VGRJDFY';
    expect(shortener.canShorten(url)).toBe(false);
  });

  test('should shorten url', () => {
    const shortened = shortener.shorten(new URLToBeShorten(url));
    expect(shortened.decode()).toBe('https://www.amazon.co.jp/dp/ABCDE12345');
  });
});
