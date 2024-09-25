document.getElementById('escape-colons-label').textContent = chrome.i18n.getMessage('settingsEscapeColons');
document.getElementById('save').value = chrome.i18n.getMessage('settingsSave');

const escapeColons = (await chrome.storage.sync.get()).escapeColons ?? false;
document.getElementById('escape-colons').checked = escapeColons;

document.getElementById('save').addEventListener('click', async (event) => {
  event.preventDefault();
  await chrome.storage.sync.set({
    escapeColons: document.getElementById('escape-colons').checked,
  });
});
