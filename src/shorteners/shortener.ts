export interface Shortener {
  canShorten(url: URL): boolean;
  shorten(url: URLToBeShorten): URLToBeShorten;
}

/**
 * potential URL to be shortened
 */
export class URLToBeShorten extends URL {
  /**
   * Delete search
   */
  deleteSearch() {
    this.search = '';
  }

  /**
   * Delete hash
   */
  deleteHash() {
    this.hash = '';
  }

  /**
   * Decode URL
   */
  decode(): string {
    return decodeURIComponent(this.toString());
  }
}
