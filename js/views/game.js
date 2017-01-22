module.exports = Backbone.View.extend({
	
	initialize() {
		this.model.on('change', this.render, this);
	},
	
	events: {
		'click #guess' : 'makeGuess',
	},
	
	makeGuess() {
		console.log('make new guess');
		
		const guesses = this.model.get('guesses');
		console.log(guesses);
		
		// Get user input and send new guess to server
		let input = JSON.stringify({
			from: 'margo', // round: 1,
			message: 'it works. cool.' // guesses: []
		});
		let guess = new this.model.Guess(input);
		
		// Add guess to guesses array
    	guesses.push(guess);
		
		// Send guess to server
		this.model.save();
		//guess.save();
	},
	
	render() {
		console.log('rendering');
		/*let button = this.el.querySelector('#more-peas');
		button.textContent = this.model.get('peas');*/
	},
});