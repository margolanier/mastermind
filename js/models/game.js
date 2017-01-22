module.exports = Backbone.Model.extend({
	urlRoot: 'http://api.queencityiron.com/chats',
	
	defaults: {
		round: 0, // chats api = 'from'
        guesses: [],
		responses: '' // chats api = 'message'
    },
	
	Guess(guess) {
		this.guess = guess;
		this.exact = null; // right color, right position
		this.close = null; // right color, wrong position

		return this;
	},
	
	checkGuess(feedback) {
		console.log('checking');
		console.log(feedback);
		//this.set('round', feedback.from);
		//this.set('responses', feedback.message);
		
		// manually trigger view re-render
		this.trigger('change');
	},
	
});