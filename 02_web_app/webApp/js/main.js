/*------------------------------------------------*/
// Web App Intro
// -------------
// We'll work with scrapi.org, an API that grabs
// information from the MET Museum's website.
// Check out the documentation here:
// github.com/metmuseum-medialab/collections-api
/*------------------------------------------------*/

var app = app || {}; 

app.main = (function(){

	//console.log('Loading app.');

	var getInput = function(){
		loadData($('#search-box').val());
	};

	//all the listeners
	var attachEvents = function(){

		//console.log('Attaching events.');
		$('#search-button').on('click', getInput);
		$('#search-box').keypress(function(e){
			//13 = enter
			if (e.which == 13){
				getInput();
			}
		});
	};

	// 2. Let's just try to load some data from the API
	var loadData = function(searchTerm){

		var defSearchURL = "http://api.urbandictionary.com/v0/define?term=" + searchTerm
		$.getJSON(defSearchURL, function(json) {
			//console.log(json);
			var defresults = json.list[0].definition;
			var numResults = json.list.length;
			//console.log(defresults);
			//console.log(numResults);
			appendDef(defresults);
		});

		var gifSearchUrl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchTerm
		$.getJSON(gifSearchUrl, function(json) {
		 	//console.log(json);
		 	var gifresults = json.data.image_url;
		 	appendGif(gifresults);
		 	//console.log(gifresults);
		});

	};

	// 3. Let's display this data
	var appendGif = function(data){

		//console.log('Appending data.');
		$('#search').hide();
		$('#content').show();
		$('body').css("background-image", "url('" + data + "')");

	};

	var appendDef = function(data){
		$("#definition").text(data);
	};

	$('#new-search').on('click', function(event){
		$('#content').hide();
		$('#search-box').val("");
		$('#search').show();
		$('body').css("background-image", "url('')");
	});

	// 1.
	var init = function(){

		//console.log('Initializing app.');
		attachEvents();

	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
