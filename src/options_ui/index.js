document.getElementById('escape-colons-label').textContent = chrome.i18n.getMessage('settingsEscapeColons');

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
