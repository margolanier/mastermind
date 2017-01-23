// Import the model and view constructors
const GameModel = require('./models/game');
const GameView = require('./views/game');


window.addEventListener('load', () => {

	// Create new model and view to start the game
	let game = new GameModel();
	let gameboard = new GameView({
		el: document.querySelector('body'),
		model: game,
	});

	// Signal a new game to server
	game.fetch();
	
});