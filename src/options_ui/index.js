for (const elm of document.querySelectorAll('[data-i18n]')) {
  elm.textContent = chrome.i18n.getMessage(elm.dataset.i18n);
}

const initialValue = {
  escapeColons: false,
  ...(await chrome.storage.sync.get()),
};

const escapeColons = document.getElementById('escape-colons');
escapeColons.checked = initialValue.escapeColons;
escapeColons.addEventListener('change', async (event) => {
  await chrome.storage.sync.set({
    escapeColons: event.target.checked,
  });
});
