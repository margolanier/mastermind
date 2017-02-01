const RoundModel = require('./models/round');

Backbone.sync = function (method, model) {
	
	// Send latest guess to server
	if (method === 'create' || method === 'update') {
		const req = new XMLHttpRequest();
		req.open('POST', 'https://mysterious-wave-13048.herokuapp.com/guess');
		req.setRequestHeader('Content-type', 'application/json');
		req.addEventListener('load', function () {
			
			// After posting new guess, server responds with data for all rounds
			const response = JSON.parse(req.responseText);
			
			// For each round object in the ajax response,
			// send info to be parsed as a new round model
			response.forEach(function(round) {
				model.collection.parseFeedback(round);
			})
			
			model.trigger('change');
		});
		
		const body = model.get('guess');
		req.send(JSON.stringify(body));
	}
};