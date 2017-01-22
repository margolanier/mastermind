require('./spectrum');

module.exports = Backbone.View.extend({
	
	initialize() {
		this.render();
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
		let input = {
			// JSON stringify?
			// do i need to specify content type like in button demo?
			from: 'margo', // round: 1,
			message: 'it works. cool.' // guesses: []
		};
		
		// trying to call the Guess() contructor in models/game.js
		// doesn't work though
		let Guess = this.model.Guess();
		let guess = new Guess(input);
		
		// Add guess to guesses array
    	guesses.push(guess);
		
		/*
		// or just manually push the input/guess to guesses[]
		// without using Game() constructor?
		let newGuess = input.message;
		guesses.push(newGuess);
		console.log(guesses);
		*/
		
		// Send guess to server
		//this.model.save();
		/* do i save the model (above) or the new 'guess' (below) ?
		i was thinking this is where you send the body like an ajax req.send(body), so the save should be on 'guess'
		*/
		guess.save();
	},
	
	render() {
		console.log('rendering');
		/*let button = this.el.querySelector('#more-peas');
		button.textContent = this.model.get('peas');*/
		
		let rounds = this.el.querySelector('#rounds');
		
		// Create each 'round' element
		for (let i=10; i>0; i--) {
			let round = document.createElement('li');
			round.setAttribute('id', `round${i}`);
			rounds.appendChild(round);
			
			// Add 'guess' options
			let guessOptions = document.createElement('div');
			guessOptions.classList.add('guessOptions');
			for (let j=0; j<4; j++) {
				let input = document.createElement('input');
				input.setAttribute('type', 'color');
				guessOptions.appendChild(input);
			}
			round.appendChild(guessOptions);
			
			// Add guess 'feedback'
			let guessFeedback = document.createElement('div');
			guessFeedback.classList.add('guessFeedback');
			for (let k=0; k<4; k++) {
				let response = document.createElement('div');
				response.setAttribute('type', 'color');
				guessFeedback.appendChild(response);
			}
			round.appendChild(guessFeedback);
			
		}
	},
	
	
});