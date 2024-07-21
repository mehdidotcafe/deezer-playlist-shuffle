export const isOnDeezer = (url) => {
  return url.includes('deezer.com');
}

export const isOnDeezerPlaylistPage = (url) => {
  return isOnDeezer(url) && url.includes('/playlist/');
}