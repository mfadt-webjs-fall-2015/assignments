
var app = app || {};


var APIKey='pdryh2e57qj9uq69nhkdyafp';

app.main = (function(){




	console.log('Loading app.');

	var getInputUsNews = function(){

		loadData('us-news');

	};
	var getInputInternational = function(){

		loadData('world');

	};

	var getInputSports = function(){

		loadData('sports');

	};

	var getInputEntertainment = function(){

		loadData('culture');

	};

	//  listeners
	var attachEvents = function(){
		console.log('Attaching events.');
		
		$('#search-button.sports').on('click', getInputSports);
		$('#search-button.us-news').on('click', getInputUsNews);
		$('#search-button.international').on('click', getInputInternational);
		$('#search-button.entertainment').on('click', getInputEntertainment);
		
	};	

	// 2. load  data from the API
	// 2. load  data from the API
	var loadData = function(searchTerm){
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		today = yyyy+'-'+mm+'-'+dd;

		console.log('today is '+today);
		console.log('Searching for ' + searchTerm + '...');
		
		var searchUrl ='http://content.guardianapis.com/search?q='+searchTerm+'&from-date='+today+'&api-key='+ APIKey;

		$.getJSON(searchUrl, function(json){
			console.log('Data received');
			console.log(json);
			var results = json.response.results;
			console.log('Found '+results.length+' results.');
			// analyzeData(results);
			appendData(results);
		});
	};

	// 3.  display data
	var appendData = function(data,counts){

		console.log('Appending data.');

		$('#view').empty(); // Jquery function!   

		for(var i = 0; i < data.length; i++){

			var newElement = document.createElement('div');
			newElement.id = data[i]; newElement.className = "head-line";
			newElement.innerHTML = data[i].webTitle;
			document.body/container/view.appendChild(newElement);

			

		}
		dataStats();

	};

	var dataStats = function(data){


		$( ".head-line" ).each(function( index ) {

			var res = $(this).text().split(" ");
			var counts = [];
			for(var i = 0; i< res.length; i++) {
				var num = res[i];
				counts[num] = counts[num] ? counts[num]+1 : 1;
				var re = /\b(?:threat|fatal|suicide|murder|assault|attack|attacks|riot|fatally|bomb|miscarriage|abortion|trump|shot|shooting|dead|death|loss|lost|loses|massacre|genocide|mass-shooting|gun|injured|crash|hurt|bad|worse|worst)\b/gi;
				var searchBase =$(this).text()

			}

				
				if ( searchBase.search(re) == -1 ){
					console.log("good news" );
					$( this ).remove();
				}
				else
				{
					console.log("bad news" );
				}
				// var newElement = document.createElement('div');
				// newElement.id = res[i]; newElement.className = "counts-wrap";

			// for (var x in counts) {
			// 	var newElement = document.createElement('div');
			// 	newElement.id = counts[x]; newElement.className = "counts";
			// 	newElement.innerHTML = x + "=" +counts[x];
			// 	$( newElement ).appendTo( $(this ) );
			// }



			console.log( index + ": " + $( this ).text() );



		});

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