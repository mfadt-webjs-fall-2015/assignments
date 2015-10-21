
var app = app || {};

app.main = (function() {
	
	var boThoughts = [];
	var newThought;

	var addThought = function(newThought) {
		boThoughts.push(newThought);
		console.log(boThoughts);

		chosenThought = newThought;
		$('#thoughts').empty();
        $('#thoughts').append('<p id="thought-output">' + chosenThought + '</p>');

		loadThoughts();
	};

	var attachEvents = function(){
		console.log('Attaching events.');

		$('#submit').off('click').on('click', function(){

			newThought = $('#thought-input').val();
			$('#thought-input').val("");
			console.log('new thought: ' + newThought);

			addThought(newThought);
		});

		$('#random-thought').off('click').on('click', function(){
			randomThoughtGenerator();
		});
	};

	var loadThoughts = function(){

		$.post('/save-thoughts', {
			data: boThoughts
		}, function(response) {
          		console.log('Received response from sending thought array.');
	    });
	};

	var randomThoughtGenerator = function(){

		// load the txt file of previously entered boThoughts
		// choose one at random
		// display to screen inside thought bubble #thought-output

		// no spaces or line breaks in file, so couldnt pull a specific piece!
		// very frustrating.

		var chosenThought = boThoughts[Math.floor(Math.random() * boThoughts.length)];
		console.log('Randomly chosen thought: ' + chosenThought);


		// var chosenThought = rand;
		$('#thoughts').empty();
        $('#thoughts').append('<p id="thought-output">' + chosenThought + '</p>');
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