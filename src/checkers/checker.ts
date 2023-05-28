export interface Shortener {
  canShorten(url: MyURL): boolean;
  shorten(url: MyURL): MyURL;
}

/**
 * potential URL to be shortened
 */
export class MyURL extends URL {
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
