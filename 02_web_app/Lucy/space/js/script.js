/*
GIPHY API: http://api.giphy.com/v1/gifs/search?q=
Public Beta Key: dc6zaTOxFJmzC

sample: http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 
*/

var app = app || {};
app.main = (function() {
	// var type;

	var attachEvents = function() {
		console.log("attaching event listeners.");

		$('#tz-button').on('click', function(){
			console.log('twilight-zone button pressed.');
			// type = 'vintage+twilight+zone';
			loadData('vintage+twilight+zone');
		});
		$('#satellite-button').on('click', function(){
			console.log('satellite button pressed.');
			// type = 'vintage+satellite';
			loadData('old+satellite');
		});
		$('#comet-button').on('click', function(){
			console.log('comet button pressed.');
			// type = 'vintage+comet';
			loadData('vintage+comet');
		});
		$('#moon-button').on('click', function(){
			console.log('moon button pressed.');
			// type = 'vintage+moon';
			loadData('vintage+moon');

		});
		$('#alien-button').on('click', function(){
			console.log('alien button pressed.');
			// type = 'vintage+alien';
			loadData('vintage+alien');

		});
		// loadData(type);
	};
	var loadData = function(searchTerm) {
		console.log('Searching for ' + searchTerm + '...');
		var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC';
		$.getJSON(searchURL, function(json){
			console.log('Data received.');
			console.log(json);
			var results = json.data;
			console.log('Found ' + results.length + ' results.');
			appendData(results);
		});
	};
	var appendData = function(data){
		console.log('Appending Data');
		console.log(data);
		$('#results').empty();
		// $('html, body').animate({
  //           scrollTop: $('#results').offset().top
  //       }, 'slow');
        for(var i = 0; i < data.length; i++){
        	$('#results').append('<img src="' + data[i].images.original.url + '" />');
        }
	}




	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};
	return {
		init: init
	};
})();
window.addEventListener('DOMContentLoaded', app.main.init);