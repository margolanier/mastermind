module.exports = Backbone.View.extend({
	
	initialize() { // what happens on init
		this.model.on('change', this.render, this);
	},
	
	events: { // event listeners
		'click #guess' : 'makeGuess',
	},
	
	makeGuess() { // event handler
		console.log('make Guess');
		
		//const guesses = this.model.get('guesses');
		//console.log(guesses);
    	//guesses.push(new Guess(guess));
		
		let guess = [1, 2, 3, 4];
		//guesses.push(new Guess(guess));
		
		//guesses.push(['hello']);

    	this.model.save(); // game.save()
	},
	
	render() {
		console.log('rendering');
		/*let button = this.el.querySelector('#more-peas');
		button.textContent = this.model.get('peas');*/
	},
});