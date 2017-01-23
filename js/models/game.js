module.exports = Backbone.Model.extend({
	defaults: {
		round: 0, // chats api = 'from'
		newGuess: null,
        guesses: [],
		feedback: [], // chats api = 'message'
    },
	
	// Send user guess to server for feedback
	sendGuess(guess) {
		
		let color_num_pairs = [
			[1, 'red', '#E03359'],
			[2, 'orange', '#F18805'],
			[3, 'yellow', '#FFEC73'],
			[4, 'green', '#9BC53D'],
			[5, 'blue', '#65DEF1'],
			[6, 'purple', '#F78CFF'],
			[7, 'black', '#242424'],
			[8, 'white', '#FFFFFF']
		];
		
		// Convert string format to numbers
		let numberGuess = [];
		
		// Iterate over all four color guesses
		for (let i=0; i<guess.length; i++) { 
			// Get the color's number equivalent
			for (let j=0; j<color_num_pairs.length; j++) {
				if (color_num_pairs[j].indexOf('#F78CFF') != -1) {
					numberGuess.push(color_num_pairs[j][0]);
				}
			}
		}
		
		// Add guess to guesses array
		const guesses = this.get('guesses');
    	guesses.push(numberGuess);
		
		// Open HTTP request
		this.save();
	},
	
	// probably won't use this constructor
	Guess(guess) {
		this.guess = guess;
		this.exact = null; // right color, right position
		this.close = null; // right color, wrong position

		return this;
	},
	
	resetGame() {
		this.set('round', 0);
		this.set('newGuess', null);
		//this.set('guesses': []);
		//this.set('feedback': []);
		
		// Trigger 'new game' on server
		this.fetch();
		// this.save();
	},
	
});


// 'Sync' is called when you fetch/save the game model
Backbone.sync = function (method, model) {
	
	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const feedback = response.chats; // temp url
			
			console.log('posting');
			console.log(feedback);
			
			// Only need to check the lastest round (last object in array)
			let latest = feedback.length - 1;
			
			// Update model round and add latest response to feedback array
			model.set('round', round);
			model.set('feedback', model.get('feedback').push(latest.response));

			// Manually trigger view re-render
			model.trigger('change');
		});
		
		const body = JSON.stringify({
			//guess: model.get('guess'),
			from: 'margo',
			message: 'cool, it is working',
		});
		
		req.send(body);
	}
	
	
	if (method === 'read') {
		const req = new XMLHttpRequest();
		// probably to /new-game
		req.open('GET', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			/*
			 * Don't need to do anything here;
			 * just signals server to generate new game
			 */
			model.trigger('change');
		});
		
		req.send();
	}
};