module.exports = Backbone.Model.extend({
	defaults: {
        round: 0, // chats api = 'from'
        guesses: [], // chats api = 'message'
    },
	
	checkGuess(latestRound, latestGuesses) {
		console.log('checking');
		this.set('round', latestRound);
		this.set('guesses', latestGuesses);
		
		// manually trigger view re-render
		this.trigger('change');
	}
	
});