const config = {
  'escape-colons': false,
  'pad-zero': 'noop',
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

    switch (config['pad-zero']) {
      case 'noop':
        break;
      case 'keep-2d':
        text = text.replace(/^(\d:)/, '0$1');
        break;
      case 'hour-1d':
        // Replacement: 0:${1:+$1:0}$2
        text = text.replace(/^(\d)?(\d:\d+)$/, (_, p1, p2) => `0:${p1 ?? '0'}${p2}`);
        break;
      case 'hour-2d':
        // Replacement: ${1:+${2:+$1:0$1}:00:}${3:+$3:0}$4
        text = text.replace(
          /^((\d)?\d:)?(\d)?(\d:\d+)$/,
          (_, p1, p2, p3, p4) => `${p1 ? p2 ? p1 : `0${p1}` : '00:'}${p3 ?? '0'}${p4}`
        );
        break;
    }

    if (config['escape-colons'])
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
