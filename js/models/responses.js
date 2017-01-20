module.exports = Backbone.Model.extend({
	
	defaults: {
		round: [-1, -1, -1, -1],
		// each round be [-1, -1, -1, -1]
		// want to show that the rounds are empty until the response/round happens
	},
	
	getFeedback() {
		console.log('getting feedback');
		// test data for now
		this.set('round', [1, 1, 1, 1]);
		// getting ajex response
		// response is overwriting original data
		// the rest of the rounds are filled with default
	},
	
});