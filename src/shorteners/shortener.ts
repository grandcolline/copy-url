export interface Shortener {
  canShorten(url: URL): boolean;
  shorten(url: URLToBeShorten): URLToBeShorten;
}

/**
 * potential URL to be shortened
 */
export class URLToBeShorten extends URL {
  /**
   * Searchを削除する
   */
  deleteSearch() {
    this.search = '';
  }

  /**
   * Hashを削除する
   */
  deleteHash() {
    this.hash = '';
  }

  /**
   * URLをデコードして表示
   */
  decode(): string {
    return decodeURIComponent(this.toString());
  }
}
