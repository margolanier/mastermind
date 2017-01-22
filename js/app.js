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


// 'Sync' is called when you fetch/save the game model
Backbone.sync = function (method, model) {

	if (method === 'read') {
		const req = new XMLHttpRequest();
		// probably to /new-game
		req.open('GET', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);

			const answer = response.chats[0];
			console.log(answer);

			// Add answer ('round 0') to array
			//model.checkGuess(answer.from, answer.message, answer.message);

		});
		req.send();
	}

	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const feedback = response.chats;

			console.log('posting');
			console.log(feedback);

			// Only need to check the lastest round
			// (last object in array)
			let latest = feedback.length - 1;
			model.checkGuess(latest.from, latest.message, latest.message);
			//model.checkGuess(latest.round, latest.guess, latest.response);
		});

		req.send();
	}
};