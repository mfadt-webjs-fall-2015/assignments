//this is an app for searching match result of Barclay premier league. Type in date to search

var app = app || {};

app.main = (function(){

//get day.month.year from the text box

var inputDate = function(){
	console.log('input date');

	$('#search-button').off('click').on('click', function(){
		getData($('#day').val(), $('#month').val(), $('#year').val());
	});

	$('#year').keypress(function(e) {
		if (e.keyCode == 13) {
			getData($('#day').val(), $('#month').val(), $('#year').val());
		}
	});	

	$('#day').keypress(function(e) {
		if (e.keyCode == 13) {
			getData($('#day').val(), $('#month').val(), $('#year').val());
		}
	});		

	$('#month').keypress(function(e) {
		if (e.keyCode == 13) {
			getData($('#day').val(), $('#month').val(), $('#year').val());
		}
	});			
};	

//get data from football api
var getData = function(day, month, year){
	console.log('url got');
	var gameUrl = 'http://football-api.com/api/?Action=fixtures&APIKey=8929efd6-3749-914d-e0d1cc61d522&match_date=' + day + "." + month + "." + year;

	$.getJSON(gameUrl, function(json){
		console.log('data received');
		var getMatch = json.matches;
		// for(var i=0; getMatch.length; i++){
		// 	console.log(getMatch[i].match_localteam_name + " " + 
		// 	getMatch[i].match_localteam_score + " - " + 
		// 	getMatch[i].match_visitorteam_score + " " + 
		// 	getMatch[i].match_visitorteam_name);
		// }
		appendData(getMatch);
	});
};

var appendData = function(data){
		console.log('Appending data.');

		// Let's clean up the results so we don't mess things up
		$('#view').empty();

		// $('html, body').animate({
  //           scrollTop: $('#view').offset().top + 'px'
  //       }, 'slow');
		if(data != null){
			for(var i = 0; i < data.length; i++){
				$('#view').append('<p>' + data[i].match_localteam_name + " " + 
					data[i].match_localteam_score + " - " + 
					data[i].match_visitorteam_score + " " + 
					data[i].match_visitorteam_name + '<p>');
			}
		}else{
			$('#view').append('<p>No match on this date</p>')
		}


	};


var init = function(){
	inputDate();
};


	return{
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);