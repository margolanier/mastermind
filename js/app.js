//const gameModel = require('./models/responses');
//const gameView = require('./views/guesses');

window.addEventListener('load', () => {
	let response = new gameModel();
	let guess = new gameView({
		el : document.querySelector('#game'),
		model: response
	});
});