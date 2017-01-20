module.exports = Backbone.View.extend({
	
	initialize() {
		this.model.on('change', this.render, this);
	},
	
	events: { // event listeners
		'click #guess' : 'checkInput',
	},
	
	checkInput() { // event handler
		console.log('clicked guess');
		this.model.getFeedback();
	},
	
	render() {
		let list = this.el.querySelector('#game');
		list.textContent = this.model.get('round');
	},
	
});