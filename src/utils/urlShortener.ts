import { Shortener, MyURL } from '../checkers/checker';

export class URLShortener {
  checkers: Shortener[];

  constructor(checkers: Shortener[]) {
    this.checkers = checkers;
  }

  shortenIfPossible(pageUrl: string): string {
    const url = new MyURL(pageUrl);

    for (const checker of this.checkers) {
      if (checker.canShorten(url)) {
        return checker.shorten(url).decode();
      }
    }

    // Return as it is if the URL is not supported
    return url.decode();
  }
}
