import { Checker, MyURL } from '../checkers/checker';

export class URLShortener {
  checkers: Checker[];

  constructor(checkers: Checker[]) {
    this.checkers = checkers;
  }

  shortenIfPossible(url: MyURL): MyURL {
    for (const checker of this.checkers) {
      if (checker.canShorten(url)) {
        return checker.shorten(url);
      }
    }

    // Return as it is if the URL is not supported
    return url;
  }
}
