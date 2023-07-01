/**
 * Question url shortener for StackOverflow
 *
 * e.g.
 * https://stackoverflow.com/questions/12345678/question-title
 * ↓
 * https://stackoverflow.com/q/12345678
 */

import { Shortener, URLToBeShorten } from './shortener';

export class StackOverflow implements Shortener {
  canShorten(url: URL): boolean {
    return (
      url.hostname.endsWith('stackoverflow.com') &&
      url.pathname.startsWith('/questions/') &&
      url.pathname.split('/').length > 2
    );
  }

  shorten(url: URLToBeShorten): URLToBeShorten {
    const shorten = new URLToBeShorten(url.toString());
    shorten.pathname = '/q/' + url.pathname.split('/')[2];
    shorten.deleteSearch();
    shorten.deleteHash();
    return shorten;
  }
}
