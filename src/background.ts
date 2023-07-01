import { Amazon } from './shorteners/amazon';
import { StackOverflow } from './shorteners/stackoverflow';
import { Youtube } from './shorteners/youtube';
import { copyToClipboard } from './utils/copyToClipboard';
import { URLShortener } from './utils/urlShortener';

// ContextMenu(右クリックメニュー)に追加
chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: 'copyurl',
    title: 'いい感じでURLをコピー',
    documentUrlPatterns: [
      'https://www.youtube.com/*',
      'https://www.amazon.co.jp/*',
      'https://stackoverflow.com/*',
      // Add a new site here
    ],
  });
});

const shortener = new URLShortener([
  new Youtube(),
  new Amazon(),
  new StackOverflow(),
  // Add a new checker for a new site here
]);

// ContextMenu(右クリックメニュー)がクリックされたときの処理
chrome.contextMenus.onClicked.addListener(
  (
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab | undefined
  ): void => {
    if (tab?.id === undefined) {
      console.error('tab.id is undefined');
      return;
    }
    const shortenedURL = shortener.shortenIfPossible(info.pageUrl);
    copyToClipboard(tab.id, shortenedURL);
  }
);
