for (const elm of document.querySelectorAll('[data-i18n]')) {
  elm.textContent = chrome.i18n.getMessage(elm.dataset.i18n);
}

const initialValue = {
  'escape-colons': false,
  'pad-zero': 'noop',
  ...(await chrome.storage.sync.get()),
};

function initOptionElm(id, prop) {
  const elm = document.getElementById(id);
  elm[prop] = initialValue[id];
  elm.addEventListener('change', async (event) => {
    await chrome.storage.sync.set({ [id]: event.target[prop] });
  });
}

initOptionElm('escape-colons', 'checked');
initOptionElm('pad-zero', 'value');

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  chrome.storage.sync.clear();
});
