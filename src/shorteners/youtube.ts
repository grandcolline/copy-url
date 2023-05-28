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
    url.host = 'youtu.be';
    url.pathname = url.searchParams.get('v') || '';
    url.deleteSearch();
    return url;
  }
}
