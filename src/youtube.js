getElm('.ytp-time-current', (elm) => {
  elm.addEventListener('click', (ev) => {
    ev.stopPropagation();
    timeCopier(elm);
  });
});
