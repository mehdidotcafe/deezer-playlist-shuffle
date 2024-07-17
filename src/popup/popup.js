import { isOnDeezerPlaylistPage } from "../is-on-deezer-playlist-page"

const chipStatusInactiveElements = document.querySelectorAll('.chip-status--inactive')
const chipStatusActiveElements = document.querySelectorAll('.chip-status--active')
const buttonShuffle = document.getElementById('button-shuffle')

buttonShuffle.addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'shuffle' })
  })
})

const setChipStatus = (elementsToHide, elementsToShow) => () => {
  elementsToHide.forEach(element => {
    element.style = 'display: none;'
  })
  elementsToShow.forEach(element => {
    element.style = 'display: inline-block;'
  })
}

const setActiveChipStatus = setChipStatus(chipStatusInactiveElements, chipStatusActiveElements)
const setInactiveChipStatus = setChipStatus(chipStatusActiveElements, chipStatusInactiveElements)

const updateActiveChipStatusFromUrl = (url) => {
  if (isOnDeezerPlaylistPage(url)) {
    setActiveChipStatus()
    buttonShuffle.removeAttribute('disabled')
  } else {
    setInactiveChipStatus()
    buttonShuffle.setAttribute('disabled', true)
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  updateActiveChipStatusFromUrl(tabs[0].url)
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      updateActiveChipStatusFromUrl(tab.url)
    }
  });
});

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (change.url) {
    updateActiveChipStatusFromUrl(tab.url)
  }
})
