import { createAndAppendShuffleButton } from './create-and-append-shuffle-button.js';
import { postFetch } from './post-fetch.js';
import { sendShuffledPlaylist, fetchPlaylist } from './fetch-actions.js';
import { onElementAvailable } from './on-element-available.js';
import { shuffleArray } from './shuffle-array.js';

let apiToken = '';

const getApiToken = () => apiToken

postFetch(apiToken, 'deezer.getUserData', {})
  .then(userData => {
    console.log(`Setting apiToken to ${userData.results.checkForm}`)

    apiToken = userData.results.checkForm
  })

const shufflePlaylist = () => {
  const playlistId = location.pathname.split("/").pop();

  return fetchPlaylist(getApiToken, playlistId)
    .then(res => {
      console.log('SONGS', res.results.SONGS.data)

      return res.results.SONGS.data.map(song => song.SNG_ID)
    })
    .then(shuffleArray)
    .then(sendShuffledPlaylist(getApiToken, playlistId))
}

const pageReload = () => {
  console.log('in page reload')
  window.location.reload();
}

const PEN_ICON_SELECTOR = '[data-testid="PenIcon"]';
onElementAvailable(PEN_ICON_SELECTOR, () => {
  createAndAppendShuffleButton(PEN_ICON_SELECTOR, () => shufflePlaylist().then(() => {
    pageReload();
  }));
});
