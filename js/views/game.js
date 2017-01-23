require('./spectrum'); // colorpicker plugin
let currentRound = 0;

module.exports = Backbone.View.extend({
	
	initialize() {
		this.render();
		this.model.on('change', this.render, this);
		
		// initialize jQuery plugin
		this.model.on('change', this.showPalette, this);
	},
	
	showPalette() {
		$('.showPalette').spectrum({
			color: '#FFFFFF',  
			showPaletteOnly: true,
			change: function(color) {
				printColor(color);
			},
			palette: [
				['#E03359', '#F18805', '#FFEC73', '#9BC53D'],
				['#65DEF1','#F78CFF', '#242424', '#FFFFFF'],
			]
		});
	},
	
	printColor(color) {
		let text = 'You chose... ' + color.toHexString();    
		$('.label').text(text);
	},
	
	events: {
		'click #guess' : 'guess',
		'click #reset' : 'newGame',
	},
	
	guess(currentRound) {
		console.log('make new guess');
		currentRound++;
		//let target = '"#round' + currentRound + ' input"';
		//let input = document.querySelectorAll(target); // li.round1 input
		let options = document.querySelectorAll('#round1 input');
		
		// Get user input (guess) for current round
		let newGuess = [];
		options.forEach(function(option) {
			newGuess.push(option.value);
		});
		// newGuess = ['#E03359', '#F18805', '#F18805', '#9BC53D'];
		console.log(newGuess);
		
		this.model.sendGuess(newGuess);
	},
	
	newGame() {
		this.model.resetGame();
	},
	
	render() {
		console.log('rendering');
		// let button = this.el.querySelector('#guess');
		
		let rounds = this.el.querySelector('#rounds');
		
		// Create each 'round' element
		for (let i=10; i>0; i--) {
			let round = document.createElement('li');
			round.setAttribute('id', `round${i}`);
			rounds.appendChild(round);
			
			// Add 'guess options' pegs
			let guessOptions = document.createElement('div');
			guessOptions.classList.add('guessOptions');
			for (let j=0; j<4; j++) {
				let input = document.createElement('input');
				input.setAttribute('type', 'text');
				input.classList.add('showPalette');
				guessOptions.appendChild(input);
			}
			round.appendChild(guessOptions);
			
			// Add 'guess feedback' pegs
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