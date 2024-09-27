const config = {
  escapeColons: false,
};
(async () => Object.assign(config, await chrome.storage.sync.get()))();
chrome.storage.sync.onChanged.addListener((changes) => {
  for (const key in changes) {
    config[key] = changes[key].newValue;
  }
});

const callback = (elm) => {
  elm.addEventListener('click', async () => {
    let text = elm.textContent;
    if (config.escapeColons)
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
