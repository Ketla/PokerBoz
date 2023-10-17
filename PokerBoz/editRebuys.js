
import { players } from './shared.js';


/* Retrieve player data from localStorage
const players = JSON.parse(localStorage.getItem('players')) || [];

// Get the players-list element where you want to display the list of players*/
const playersListDiv = document.getElementById('players-list');

// Loop through the players and add them to the players-list*/

console.log(players);


players.forEach(player => {
  const playerDiv = document.createElement('div');
  playerDiv.className = 'player-row';

  const saveNewRebuyButton = document.createElement('button');
  saveNewRebuyButton.innerHTML = 'Save';
  saveNewRebuyButton.addEventListener('click', () => {
    const rebuyInput = document.querySelector(`#rebuy-input-${player.name}`);
    saveNewRebuyValue(player, playerDiv, rebuyInput);
  });

  playerDiv.innerHTML = `
    <span>${player.name} <strong>[ ${player.rebuyCount} ]</strong></span>
    <input value="${player.rebuyCount}" id="rebuy-input-${player.name}">
  `;

  playerDiv.appendChild(saveNewRebuyButton);
  playersListDiv.appendChild(playerDiv);
});


function saveNewRebuyValue(player, playerDiv, rebuyInput) {
  // Get the new rebuyCount value from the input field
  
  const oldRebuyCount = player.rebuyCount;
  
  const newRebuyCount = parseInt(rebuyInput.value, 10);

  player.rebuyCount = newRebuyCount;

  console.log(players);

  playerDiv.querySelector('strong').textContent = `[ ${newRebuyCount} ]`;

  // Update the localStorage with the modified players array
  localStorage.setItem('players', JSON.stringify(players));

  rebuyLogger(oldRebuyCount, newRebuyCount, player);

}

function rebuyLogger(oldRebuyCount, newRebuyCount, player) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString(); // Format as a localized date and time string
  console.log(formattedDate);

  let rebuyLogText = document.getElementById('rebuy-logg');

  rebuyLogText.innerHTML = `(${formattedDate}) ${player.name} ${oldRebuyCount} --> ${newRebuyCount}`
}

function backButtonClickHandler() {
  console.log('Back button clicked'); // Debugging log

  // Trigger a custom event to update the game info in liveGameScript.js
  const updateEvent = new Event('updateGameInfoEvent');
  document.dispatchEvent(updateEvent);

  // Navigate back to the gameLive.html page (you can use window.location.href)
  window.location.href = 'gameLive.html'; // Adjust the URL as needed
}

document.getElementById('back-to-game').addEventListener('click', backButtonClickHandler);



