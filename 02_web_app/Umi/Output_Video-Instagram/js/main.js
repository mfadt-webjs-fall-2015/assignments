/*------------------------------------------------*/
// Instagram API - HW Week 2 by Umi Syam
// -------------------------------------
// Modified from in-class example by Gabriel Gianordoli
/*------------------------------------------------*/

var app = app || {};
// var client_id = 'bd13feb51f4646a4b79988d89802b12f';
//After multiple attempts I found out that accessing the API using Client ID only returns max. 20 media each calls
//So I decided to use Access Token instead
var access_token = '400806495.bd13feb.495196187aa94809b4089b7fe38af9c2';
var access_parameters = {access_token:access_token};

app.main = (function(){
	console.log('Loading app.');

	var getInput = function(){
		loadData($('#search-box').val());
	};

	var attachEvents = function(){
		$('#search-button').on('click', getInput);
		$('#search-box').keypress(function(e){
			if (e.keyCode == 13) {	//13 IS ENTER
				getInput();
			}
		});
	};

	var loadData = function(searchTerm){
		console.log('Searching for ' + searchTerm + '...');
		
		//WAY 1: Using Client ID
		//A CORS proxy (http://cors.io/) as a solution because I keep getting this error on console:
		//"No 'Access-Control-Allow-Origin' header is present on the requested resource. 
		//Origin <blablabla> is therefore not allowed access."
		// var searchUrl = 'http://cors.io/?u=https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?client_id=' + client_id + '&count=50';
		// $.getJSON(searchUrl, function(response){
		// 	var results = response.data;
		// 	console.log(results);
		// 	appendData(results);
		// }); 

		//WAY 2: Using Access Token (returns more media)
		var count = 33;
		var instagramUrl = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?callback=?&count='+ count;

		$.getJSON(instagramUrl, access_parameters, function(response){
			var results = response.data;
			console.log(results);
			appendData(results);
		});

	};

	var appendData = function(data){
		console.log('Appending data.');		

		$('#view').empty();

		for (var i=0; i<data.length; i++) {
			if (data[i].type == "video") {
				console.log("video " + i);
				$('#view').append('<div class="result"><video controls autoplay loop muted src="' + 
					data[i].videos.low_resolution.url + '">Your browser does not support the video tag.</video></div>');
			} else {
				$('#view').append('<div class="result"><img src="' + data[i].images.low_resolution.url + '" /></div>');
			}	
		}
	};

	
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