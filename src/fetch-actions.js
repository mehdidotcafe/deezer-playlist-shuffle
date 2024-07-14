import { postFetch } from "./post-fetch";

export const sendPlaylistShuffle = (getApiToken, playlistId) => (order) => {
  const body = {
    playlist_id: playlistId,
    position: 0,
    order: order
  };
  
  return postFetch(getApiToken(), 'playlist.updateOrder', body);
}

export const fetchPlaylist = (getApiToken, playlistId) => {
  const body = {
    nb: 2000,
    start: 0,
    playlist_id: playlistId,
    lang: "en",
    tab: 0,
    tags: true,
    header: true
  }

  return postFetch(getApiToken(), 'deezer.pagePlaylist', body)
    
}