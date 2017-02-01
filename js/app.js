const GameModel = require('./models/game');
const GameView = require('./views/board');
const GameStart = require('./new-game');
require('./ajax.js');

window.addEventListener('load', () => {
	
	// Signal a new game to server to reset the answer
	//const reset = GameStart.post('https://mysterious-wave-13048.herokuapp.com/new-game', {});
	
	// Define the game model and view
	const game = new GameModel();
	
	const view = new GameView({
		el: document.querySelector('body'),
		model: game,
	});
	
	view.render();
});