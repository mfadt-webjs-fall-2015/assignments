/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	
	var attachEvents = function(){
	};


	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};


	//所有東西都要遣返
	return {
		init:init

	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);