import { Checker, MyURL } from './checker';

export class Youtube implements Checker {
  canShorten(url: MyURL): boolean {
    return (
      (url.hostname.endsWith('youtube.com') ||
        url.hostname.endsWith('youtu.be')) &&
      url.pathname === '/watch' &&
      url.searchParams.has('v')
    );
  }

  shorten(url: MyURL): MyURL {
    url.host = 'youtu.be';
    url.pathname = url.searchParams.get('v') || '';
    url.searchParams.delete('feature');
    url.searchParams.delete('v');
    return url;
  }
}
