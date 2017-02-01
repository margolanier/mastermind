module.exports = {
	post: function(url, message) {
		let request = new XMLHttpRequest();
		request.open('POST', url);
		let body = JSON.stringify(message);
		
		request.addEventListener('load', function() {
			// don't need to listen for response
			// just posting an empty message
		});
		
		request.send(body);
	},
};