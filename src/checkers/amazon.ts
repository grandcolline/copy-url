import { Shortener, MyURL } from './checker';

export class Amazon implements Shortener {
  regex = new RegExp('/dp/[A-Z0-9]{10}', 'g');

  canShorten(url: MyURL): boolean {
    return (
      url.hostname.endsWith('amazon.co.jp') && this.regex.test(url.pathname)
    );
  }

  shorten(url: MyURL): MyURL {
    const newPath = url.pathname.match(this.regex);
    if (newPath && newPath?.length === 1) {
      url.pathname = newPath[0];
      url.deleteSearch();
      url.deleteHash();
    }
    return url;
  }
}
