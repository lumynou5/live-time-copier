const escapeColon = (await chrome.storage.sync.get()).escapeColon ?? false;
document.getElementById('escape-colon').checked = escapeColon;

document.getElementById('submit').addEventListener('click', async (event) => {
  event.preventDefault();
  await chrome.storage.sync.set({
    escapeColon: document.getElementById('escape-colon').checked,
  });
});
