import { Shortener, URLToBeShorten } from './shortener';

export class Youtube implements Shortener {
  canShorten(url: URL): boolean {
    return (
      (url.hostname.endsWith('youtube.com') ||
        url.hostname.endsWith('youtu.be')) &&
      url.pathname === '/watch' &&
      url.searchParams.has('v')
    );
  }

  shorten(url: URLToBeShorten): URLToBeShorten {
    const shorten = new URLToBeShorten(url.toString());
    shorten.host = 'youtu.be';
    shorten.pathname = shorten.searchParams.get('v') || '';
    shorten.deleteSearch();
    return shorten;
  }
}
