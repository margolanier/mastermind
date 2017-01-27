const RoundModel = require('./models/round');

// module.exports = Backbone.sync;
Backbone.sync = function (method, model) {
	
	// Send guess
	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'https://mysterious-wave-13048.herokuapp.com/guess');
		req.setRequestHeader('Content-type', 'application/json');
		req.addEventListener('load', function () {
			
			console.log('posting');
			// After posting new guess, fetch all rounds
			model.collection.fetch();
		});
		
		const body = model.get('guess');
		
		req.send(JSON.stringify(body));
	}
	
	// Get all rounds
	if (method === 'read') {
		const req = new XMLHttpRequest();
		req.open('GET', 'https://mysterious-wave-13048.herokuapp.com/guess');
		req.addEventListener('load', function () {
			const response = JSON.parse(req.responseText);
			//const allRounds = response.chats;
			const allRounds = response;
			
			console.log('fetching');
			// For each round object in the ajax response,
			// send info to be parsed as a new round model
			/*for (let i=0; i<response.chats.length; i++) {
				model.parseFeedback(response.chats[i]);
			}*/
			
			model.trigger('change');
		});
		
		req.send();
	}
};