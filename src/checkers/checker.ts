export interface Checker {
  canShorten(url: MyURL): boolean;
  shorten(url: MyURL): MyURL;
}

/**
 * URLクラスを継承したクラス
 */
export class MyURL extends URL {
  /**
   * URLを変換
   */
  replace(c: Checker) {
    if (c.canShorten(this)) {
      const url = c.shorten(this);
      this.host = url.hostname;
      this.pathname = url.pathname;
      this.search = url.search;
      this.hash = url.hash;
    }
  }

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
  format(): string {
    return decodeURIComponent(this.toString());
  }
}
