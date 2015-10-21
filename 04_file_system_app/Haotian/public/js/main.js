/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){
		$('input-button').off('click').on('click', function(){
			loadText($(this).html());
		});
	};

	var loadText = function(){
		$.getJSON('/text', function(response){
		});	

		$.post('/text', {
			text: text
		}, function(response) {
        	console.log(response);
        	$('#output').empty();
        	$('#output').append('<p> ' + response['text'] + '</p>');
        	for(var prop in response['text']){
				$('#output').append('<p>' + prop + ': ' + response['text'][prop] + '</p>');
        	}
	    });
	};

	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);