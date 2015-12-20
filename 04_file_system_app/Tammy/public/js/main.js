/* Your code starts here */
var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var socket = io();
  $('#button').click(function(){
    socket.emit('secret message', $('#myText').val());
    $('#myText').val('');
    return false;
  });

	

	var init = function(){
		console.log('Initializing app.');

	};

	return {
		init: init
	};


})();

window.addEventListener('DOMContentLoaded', app.main.init);
