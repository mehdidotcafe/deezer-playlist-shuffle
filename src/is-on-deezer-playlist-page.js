export const isOnDeezerPlaylistPage = (url) => {
  return url.includes('deezer.com') && url.includes('/playlist/');
}