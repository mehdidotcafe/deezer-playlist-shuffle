export function onElementAvailable(selector, callback) {
  const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
      observer.disconnect();
      callback();
    }
  });

  if (isOnPlaylistPage(location.pathname)) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.navigation.addEventListener("navigate", (e) => {
    if (isOnPlaylistPage(e.destination.url)) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  })
}

const isOnPlaylistPage = (url) => {
  return url.includes("/playlist/");
}
