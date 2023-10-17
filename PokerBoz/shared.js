// shared.js

// Define a global players array
const players = JSON.parse(localStorage.getItem('players')) || [];

// Export the players array so it can be used in other scripts
export { players };
