// Import the model and view constructors
const GameModel = require('./models/game');
const GameView = require('./views/game');


window.addEventListener('load', () => {
	
	// Create new model and view to start the game
	let game = new GameModel();
	let gameboard = new GameView({
		el: document.querySelector('#gameboard'),
		model: game,
	});
	
	// Signal a new game to server
	game.fetch();
});


// 'Sync' is called when you fetch/save the game model
Backbone.sync = function(method, model) {
	
	if (method === 'read') {
        const req = new XMLHttpRequest();
		// probably to /new-game
        req.open('GET', 'http://api.queencityiron.com/chats');
        req.addEventListener('load', function () {
            const response = JSON.parse(req.responseText);
			const feedback = response.chats[0];
			console.log(feedback);
			
			//model.checkGuess(feedback);
			
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
			
			model.checkGuess(feedback);
			//model.checkGuess(response.round, response.guesses);
        });
		
        req.send();
    }
};