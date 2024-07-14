
const TOOLBAR_SELECTOR = '[data-testid="toolbar"]';

const createShuffleButton = (selectorToClone, callback) => {
  const shuffleButtonContainer = document.querySelector(selectorToClone).parentElement.parentElement.cloneNode(true);

  shuffleButtonContainer.title = 'Shuffle playlist';
  shuffleButtonContainer.firstChild.setAttribute('aria-label', 'Shuffle playlist');
  shuffleButtonContainer.firstChild.innerHTML = `
    <svg viewBox="-9.36 -9.36 42.72 42.72" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M4 8H6.8915C7.58108 8 8.22202 8.35524 8.5875 8.94L12.4125 15.06C12.778 15.6448 13.4189 16 14.1085 16H20M20 16L17.5 13.5M20 16L17.5 18.5M14 8H20M20 8L17.5 10.5M20 8L17.5 5.5M4 16H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
  `
  shuffleButtonContainer.firstChild.addEventListener('click', () => {
    console.log('Shuffle button clicked')
    callback()
  });

  return shuffleButtonContainer;
}

export const createAndAppendShuffleButton = (selectorToClone, callback) => {
  console.log('In createAndAppendShuffleButton')

  const toolbar =  document.querySelector(TOOLBAR_SELECTOR);

  toolbar.appendChild(createShuffleButton(selectorToClone, callback)); 
}
