class Youtube implements Checker {
  check(url: MyURL): boolean {
    return (
      (url.hostname.endsWith("youtube.com") ||
        url.hostname.endsWith("youtu.be")) &&
      url.pathname === "/watch" &&
      url.searchParams.has("v")
    );
  }

  replace(url: MyURL): MyURL {
    url.host = "youtu.be";
    url.pathname = url.searchParams.get("v")!!;
    url.searchParams.delete("feature");
    url.searchParams.delete("v");
    return url;
  }
}

class Amazon implements Checker {
  regex = new RegExp("/dp/[A-Z0-9]{10}", "g");

  check(url: MyURL): boolean {
    return (
      url.hostname.endsWith("amazon.co.jp") && this.regex.test(url.pathname)
    );
  }

  replace(url: MyURL): MyURL {
    const newPath = url.pathname.match(this.regex);
    if (newPath && newPath?.length == 1) {
      url.pathname = newPath[0];
      url.deleteSearch();
      url.deleteHash();
    }
    return url;
  }
}

/**
 * copyToClipboard
 */
const copyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = text;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};

/**
 * Struct
 */
interface Checker {
  check(url: MyURL): boolean;
  replace(url: MyURL): MyURL;
}

/**
 * URLクラスを継承したクラス
 */
class MyURL extends URL {
  /**
   * URLを変換
   */
  replace(c: Checker) {
    if (c.check(this)) {
      let url = c.replace(this);
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
    this.search = "";
  }

  /**
   * Hashを削除する
   */
  deleteHash() {
    this.hash = "";
  }

  /**
   * URLをデコードして表示
   */
  format(): string {
    return decodeURIComponent(this.toString());
  }
}

// ContextMenu(右クリックメニュー)に追加
chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: "copyurl",
    title: "いい感じでURLをコピー",
    documentUrlPatterns: ["https://www.youtube.com/*", "https://www.amazon.co.jp/*"]
  });
});

// 処理
chrome.contextMenus.onClicked.addListener((info, _): void => {
  const url = new MyURL(info.pageUrl);

  url.replace(new Youtube());
  url.replace(new Amazon());

  copyToClipboard(url.format());
});
