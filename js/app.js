const GameModel = require('./models/game');
const GameView= require('./views/board');
const RoundModel = require('./models/round');
require('./ajax.js');

window.addEventListener('load', () => {
	
	// Create new model and view to start the game
	const game = new GameModel();
	
	const view = new GameView({
		el: document.querySelector('body'),
		model: game,
	});
	
	// Signal a new game to server
	const initiate = new RoundModel();
	//initiate.save();
	
	//initiate.save({}, {url: "https://mysterious-wave-13048.herokuapp.com/new-game"});
	initiate.url = 'https://mysterious-wave-13048.herokuapp.com/new-game';
	initiate.save();
});