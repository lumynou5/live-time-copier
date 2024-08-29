const callback = (elm) => {
  elm.addEventListener('click', async () => {
    let text = elm.textContent;
    if ((await browser.storage.sync.get()).escapeColon)
      text = text.replaceAll(':', '\\:');
    await navigator.clipboard.writeText(text);
  });
};

const getElm = (selector) => {
  let result = document.querySelector(selector);
  if (result) {
    callback(result);
    return;
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE)
          continue;
        result = node.matches(selector) && node || node.querySelector(selector);
        if (!result)
          continue;
        observer.disconnect();
        callback(result);
        return;
      }
    }
  });
  observer.observe(document, {childList: true, subtree: true});
};

const getElmContinuous = (selector) => {
  let result = document.querySelector(selector);
  if (result)
    callback(result);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE)
          continue;
        result = node.matches(selector) && node || node.querySelector(selector);
        if (!result)
          continue;
        callback(result);
      }
    }
  });
  observer.observe(document, {childList: true, subtree: true});
};
