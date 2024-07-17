import { isOnDeezerPlaylistPage } from "./is-on-deezer-playlist-page.js";

export function onElementAvailable(selector, callback) {
  const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
      observer.disconnect();
      callback();
    }
  });

  if (isOnDeezerPlaylistPage(location.href)) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.navigation.addEventListener("navigate", (e) => {
    if (isOnDeezerPlaylistPage(e.destination.url)) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  })
}
