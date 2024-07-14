import { createAndAppendShuffleButton } from './create-and-append-shuffle-button.js';
import { postFetch } from './post-fetch.js';
import { sendPlaylistShuffle, fetchPlaylist } from './fetch-actions.js';
import { onElementAvailable } from './on-element-available.js';
import { shuffleArray } from './shuffle-array.js';

let apiToken = '';

const getApiToken = () => apiToken

postFetch(apiToken, 'deezer.getUserData', {})
  .then(userData => {
    console.log(`Setting apiToken to ${userData.results.checkForm}`)

    apiToken = userData.results.checkForm
  })

const playlistShuffle = () => {
  const playlistId = location.pathname.split("/").pop();

  return fetchPlaylist(getApiToken, playlistId)
    .then(res => res.results.SONGS.data.map(song => song.SNG_ID))
    .then(shuffleArray)
    .then(sendPlaylistShuffle(getApiToken, playlistId))
}

const pageReload = () => {
  window.location.reload();
}

const PEN_ICON_SELECTOR = '[data-testid="PenIcon"]';
onElementAvailable(PEN_ICON_SELECTOR, () => {
  createAndAppendShuffleButton(PEN_ICON_SELECTOR, () => playlistShuffle().then(() => {
    pageReload();
  }));
});
