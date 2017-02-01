const RoundModel = require('./round');

module.exports = Backbone.Collection.extend({
	model: RoundModel,
	
	// After user makes a guess for current round,
	// create new Round model to send to server
	postGuess(newGuess) {
		
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
		for (let i=0; i<newGuess.length; i++) { 
			// Get the color's number equivalent
			for (let j=0; j<color_num_pairs.length; j++) {
				if (color_num_pairs[j].indexOf('#F78CFF') != -1) {
					numberGuess.push(color_num_pairs[j][0]);
				}
			}
		}
		
		// Create Round model
		const currentGuess = new RoundModel();
		currentGuess.set('guess', numberGuess);
		
		// Send model as POST request
		currentGuess.collection = this;
		currentGuess.save();
	},
	
	// After response comes back from server,
	// parse through all chats and create model for each
	parseFeedback(response) {
		const round = new RoundModel();
		round.set('round', response.id);
		round.set('guess', response.guesses);
		round.set('feedback', response.checks);
		
		this.add(round);
		console.log(round);
	},
	
});