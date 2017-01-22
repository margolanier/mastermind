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
		//let Guess = this.model.Guess();
		//let guess = new Guess(input);
		
		// Add guess to guesses array
    	//guesses.push(guess);
		
		/*
		// or just manually push the input/guess to guesses[]
		// without using Game() constructor?
		let newGuess = input.message;
		guesses.push(newGuess);
		console.log(guesses);
		*/
		
		// Send guess to server
		this.model.save();
		/* do i save the model (above) or the new 'guess' (below) ?
		i was thinking this is where you send the body like an ajax req.send(body), so the save should be on 'guess'
		*/
		//guess.save();
	},
	
	render() {
		console.log('rendering');
		
		let fakeResponse = [
			{
				"round": 0,
				"guess": [1, 2, 3, 4],
				"response": [],
			},
			{
				"round": 1,
				"guess": [4, 6, 3, 6],
				"response": [1, 0, 2, 0],
			},
			{
				"round": 2,
				"guess": [1, 7, 3, 5],
				"response": [2, 0, 2, 0],
			},
		];
		let round = 3;
		let fake_guesses = [
			[1, 2, 3, 4],
			[4, 6, 3, 6],
			[1, 7, 3, 5],
		];
		let fake_responses = [
			[],
			[1, 0, 2, 0],
			[1, 7, 3, 5],
		];
		
		fake_responses.forEach(function(response) {
			console.log('R');
		});
		
		/*let button = this.el.querySelector('#more-peas');
		button.textContent = this.model.get('peas');*/
	},
});