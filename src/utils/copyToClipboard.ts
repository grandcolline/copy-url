export const copyToClipboard = (tabId: number, text: string) => {
  function injectedFunction(text: string) {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      console.log('failed to copy text to clipboard');
    }
  }

  // workaround: service worker does not have document object,
  // and clipboard api cannot be used from service worker
  chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: [text],
  });
};
