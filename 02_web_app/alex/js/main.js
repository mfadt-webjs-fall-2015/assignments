

var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	var getInput = function(){
		
		loadData($('#search-box').val());
	};

	//  listeners
	var attachEvents = function(){
		console.log('Attaching events.');
		
		$('#search-button').on('click', getInput);
		$('#search-box').keypress(function(e){
			if (e.keyCode == 13){
				getInput(); 
			}
		});
	};	

	// 2. load  data from the API
	var loadData = function(searchTerm){
		console.log('Searching for ' + searchTerm + '...');
		// var searchUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + searchTerm;
		var searchUrl = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + searchTerm;
		// GG: take a look into the API documentation:
		// random returns a single 'random' gif.
		// The function you're looking for is 'search'.
		// Also, needed to change from tag to q (query) for search.
		
		$.getJSON(searchUrl, function(json){
			console.log('Data received');
			console.log(json);
			var results = json.data;
			console.log('Found '+results.length+' results.');
			appendData(results);
		});
	};

	// 3.  display data
	var appendData = function(data){
		console.log('Appending data.');

	$('#view').empty(); // Jquery function!
	for(var i = 0; i < data.length; i++){
		// console.log(data[i]);
		//i cant get the application to display all of the results in the view finder as in the class example
		$('#view').append('<img src="' + data[i].images.fixed_height.url + '" />');
		// The json tree changes a bit with 'search'

		// $('body').css("background-image", "url('" + data + "')");
	}
		//replace title text
		
		$('#title').empty(); 

		// var newTitle= $('#search-box').val();
		$('#title').html("You should be doing something better with your time besides looking at gifs of  " + $('#search-box').val() +"!");
		//i can't seem to do this without redeclaring the searchbox.val as a new variable. is there a more efficient way to do this with jquery?
		// GG: You can concatenate JQuery function (see above).
		// GG: Or send the searchTerm to appendData.
	
		
		

	};



	// 1. initialize application
	var init = function(){
		console.log('start app.');
		attachEvents();
	};

	return {
		init: init
	};
})();


window.addEventListener('DOMContentLoaded', app.main.init);