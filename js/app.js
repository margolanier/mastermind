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
	
	//gameboard.makeGuess(['r', 'g', 'o', 'p']);
	
    // call fetch to make GET server request
	game.fetch();
	
	/*let newChat = new GameModel({ from: 'margo', message: 'gaming' });
	newChat.save();*/
	
	// call save to make POST server request
    //game.save();
});

// Might not need this
function Guess(guess) {
    this.guess = guess;
    this.exact = null; // right color, right position
    this.close = null; // right color, wrong position

    return this;
}


// 'Sync' is called when you fetch/save the game model
Backbone.sync = function(method, model) {
	
	if (method === 'read') {
        const req = new XMLHttpRequest();
        req.open('GET', 'http://api.queencityiron.com/chats');
        req.addEventListener('load', function () {
            const response = JSON.parse(req.responseText);
			const feedback = response.chats[0];
			console.log(feedback);
			
			const latestRound = feedback.from; // feedback.round;
			const latestGuess = feedback.message; // feedback.guesses;
			console.log(latestGuess);
			//guesses.push(new Guess(guess));
			
			//console.log('this = ');
			//console.log(this);
			//this.gameboard.alertMe();

			//let guess = [1, 2, 3, 4];
			//guesses.push(new Guess(guess));

			//guesses.push(['hello']);
			
        });
        req.send();
    }
	
	// create new object or update exisiting one
    if (method === 'create' || method === 'update') {
        const req = new XMLHttpRequest();
        req.open('POST', 'http://api.queencityiron.com/chats');
        req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			//const response = JSON.parse(req.responseText);
			console.log(response);
			console.log('posting');
			
			// get latest response from server
			// update 'round' and 'guesses' values
			model.checkGuess(response.from, response.message);
			//model.checkGuess(response.round, response.guesses);
        });
		
        req.send();
    }
};