const buyInAmountInput = document.getElementById('buy-in-amount');
const setBuyInButton = document.getElementById('set-buy-in');
const buyInAmountDisplay = document.getElementById('buy-in-amount-display');

let buyInAmount = '200'; // Default value

setBuyInButton.addEventListener('click', () => {
    // Get the current value from the input
    let inputValue = buyInAmountInput.value.trim();

    // Validate the inputValue, e.g., check if it's a number, not negative, etc.
    // Here, we're just checking if it's not empty
    if (inputValue) {
        buyInAmount = inputValue;
    }

    buyInAmountDisplay.innerHTML = `Buy-In Amount Per Player: ${buyInAmount}`;

    setBuyInButton.disabled = true;
    buyInAmountInput.disabled = true;

    buyInAmountDisplay.classList.add('set');

});

let players = [];

const addPlayerInput = document.getElementById('player-name');
const addPlayerButton = document.getElementById('add-player');
const playersListDiv = document.getElementById('players-list');

addPlayerButton.addEventListener('click', () => {
  const playerName = addPlayerInput.value.trim();

  // Check if player name is at least 5 characters long
  if (playerName.length < 5) {
      alert("Player name must be at least 5 characters long.");
      return; // Exit the function
  }

  // Check if player name already exists
  const nameExists = players.some(player => 
    player.name && player.name.toLowerCase() === playerName.toLowerCase()
);
  
  if (nameExists) {
      alert("Player name already exists. Please enter a different name.");
      return; // Exit the function
  }

  players.push({
      name: playerName,
      buyin: buyInAmount,
      rebuyCount: 0
  });

  updateTotalBuyIn();
  addPlayerToDisplay(playerName, buyInAmount);

  addPlayerInput.value = '';

});

const playersDataDiv = document.getElementById('players-data');

function addPlayerToDisplay(name, buyin) {
  const playerDiv = document.createElement('div');
  playerDiv.className = 'player-row';

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', () => {
      removePlayer(name);
      playerDiv.remove();
  });

  playerDiv.innerHTML = `
      <span>${name}</span>
      <span>${buyin}</span>
  `;

  playerDiv.appendChild(removeButton);
  playersListDiv.appendChild(playerDiv);

  console.log(players);

}

function removePlayer(name) {
  players = players.filter(player => player.name !== name);

  updateTotalBuyIn();

  console.log(players);

}

function updateTotalBuyIn() {
  const total = players.reduce((sum, player) => sum + Number(player.buyin), 0);
  const totalDisplay = document.getElementById('total-buyin-display');
  totalDisplay.innerHTML = `${players.length} Players & Total Buy-In Amount <span class="bold-number">${total}</span>`;
}

function handleRebuy(playerName) {
  // Find the player in the players array
  const player = players.find(p => p.name === playerName);
  
  if (!player) return;

  // Increment the player's rebuy count
  player.rebuyCount++;

  // Update the player's total buy-in
  player.buyin += buyInAmount;

  // Update the total buy-in for all players
  updateTotalBuyIn();

  // Optional: Update the UI to reflect the new rebuy count for the player
}

document.getElementById('start-game').addEventListener('click', function() {
  localStorage.setItem('players', JSON.stringify(players));
  window.location.href = 'gameLive.html';
});

const clearLocalDataButton = document.getElementById('clear-local-data');
clearLocalDataButton.addEventListener('click', () => {
  // Clear the local storage data
  localStorage.removeItem('players');
  // Optionally, you can also clear the displayed player list on the page
  playersListDiv.innerHTML = '';
  console.log(players);
});
