/*------------------------------------------------*/
// This is a JS assignment by Heloise
// I took the shuffle function from   
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Further info: https://github.com/coolaj86/knuth-shuffle
// further credits: https://github.com/coolaj86

/*------------------------------------------------*/

var app = app || {};

app.main = (function(){
	console.log('Loading app.');
	var attachEvents = function(){
		console.log('Attaching events.');

		$('#random-button').off('click').on('click', function(){
			getVerses($('#input-verses').val());
		});
	};

	var getVerses = function(text) {
	var verses = text.split(/\n/);

	console.log(verses.length+' Verses obtained, they are:');
	console.log(verses);
	shuffle(verses);
	console.log(verses);
	showVerses(verses);
	}

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  console.log(array.length+' Verses shuffled:');
	  return array;
	}
	
	function showVerses(verses) {
	for( var i = 0; i < verses.length; i++ ){
		$('#results').append('<br>'+verses[i]);
	}

	};

	// 1.
	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
