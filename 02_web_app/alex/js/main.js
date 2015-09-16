

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
		var searchUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + searchTerm;
		
		$.getJSON(searchUrl, function(json){
			console.log('Data received');
			console.log(json);
			var results = json.data.image_url;
			console.log('Found '+results.length+' results.');
			appendData(results);
		});
	};

	// 3.  display data
	var appendData = function(data){
		console.log('Appending data.');

		$('#view').empty(); // Jquery function!
	for(var i = 0; i < data.length; i++){

		//i cant get the application to display all of the results in the view finder as in the class example
		//$('#view').append('<img src="' + data[i].images.url + '" />');
			$('body').css("background-image", "url('" + data + "')");
		}
		//replace title text
		
		$('#title').empty(); 

		var newTitle= $('#search-box').val();
		$('#title').html("You should be doing something better with your time besides looking at gifs of  " +newTitle +"!");
		//i can't seem to do this without redeclaring the searchbox.val as a new variable. is there a more efficient way to do this with jquery?
	
		
		

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