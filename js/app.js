// Import the model and view constructors
const GameModel = require('./models/game');
const GameView = require('./views/game');
const Spectrum = require('spectrum-colorpicker');


window.addEventListener('load', () => {

	// Create new model and view to start the game
	let game = new GameModel();
	let gameboard = new GameView({
		el: document.querySelector('body'),
		model: game,
	});

	// Signal a new game to server
	game.fetch();

	function printColor(color) {
		var text = "You chose... " + color.toHexString();
		document.querySelector(".label").text(text);

	}

	let colorbtn = document.querySelector('#showPaletteOnly').Spectrum.spectrum({
		color: "rgb(244, 204, 204)",
		showPaletteOnly: true,
		change: function (color) {
			printColor(color);
		},
		palette: [
			["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
			"rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
			["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
			"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"]
		]
	});
});


// 'Sync' is called when you fetch/save the game model
Backbone.sync = function (method, model) {

	if (method === 'read') {
		const req = new XMLHttpRequest();
		// probably to /new-game
		req.open('GET', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);

			const answer = response.chats[0];
			console.log(answer);

			// Add answer ('round 0') to array
			//model.checkGuess(answer.from, answer.message, answer.message);

		});
		req.send();
	}

	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://api.queencityiron.com/chats');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			const feedback = response.chats;

			console.log('posting');
			console.log(feedback);

			// Only need to check the lastest round
			// (last object in array)
			let latest = feedback.length - 1;
			model.checkGuess(latest.from, latest.message, latest.message);
			//model.checkGuess(latest.round, latest.guess, latest.response);
		});

		req.send();
	}
};