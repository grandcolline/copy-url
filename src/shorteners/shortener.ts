export interface Shortener {
  canShorten(url: URL): boolean;
  shorten(url: URLToBeShorten): URLToBeShorten;
}

/**
 * potential URL to be shortened
 */
export class URLToBeShorten extends URL {
  /**
   * delete search
   */
  deleteSearch() {
    this.search = '';
  }

  /**
   * delete hash
   */
  deleteHash() {
    this.hash = '';
  }

  /**
   * decode URL
   */
  decode(): string {
    return decodeURIComponent(this.toString());
  }
}
