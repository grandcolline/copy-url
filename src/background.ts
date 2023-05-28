import { Amazon } from './checkers/amazon';
import { MyURL } from './checkers/checker';
import { Youtube } from './checkers/youtube';
import { copyToClipboard } from './utils/copyToClipboard';

// ContextMenu(右クリックメニュー)に追加
chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: 'copyurl',
    title: 'いい感じでURLをコピー',
    documentUrlPatterns: [
      'https://www.youtube.com/*',
      'https://www.amazon.co.jp/*',
    ],
  });
});

// 処理
chrome.contextMenus.onClicked.addListener(
  (
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab | undefined
  ): void => {
    const url = new MyURL(info.pageUrl);

    url.replace(new Youtube());
    url.replace(new Amazon());
    if (tab?.id === undefined) {
      console.log('tab.id is undefined');
      return;
    }
    copyToClipboard(tab.id, url.format());
  }
);
