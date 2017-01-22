module.exports = Backbone.Model.extend({
	urlRoot: 'http://api.queencityiron.com/chats',
	
	defaults: {
		round: 0, // chats api = 'from'
        guesses: [],
		responses: [] // chats api = 'message'
    },
	
	reset() {
		this.set('turns', 0);
		this.save();
	},
	
	Guess(guess) {
		this.guess = guess;
		this.exact = null; // right color, right position
		this.close = null; // right color, wrong position

		return this;
	},
	
	checkGuess(round, guess, response) {
		console.log('check guess');
		
		this.set('round', round);
		this.set('guesses', guesses.push(guess));
		this.set('responses', responses.push(response));
		
		console.log(round, guess, response);
		console.log(this.defaults);
		
		// manually trigger view re-render
		this.trigger('change');
	},
	
});