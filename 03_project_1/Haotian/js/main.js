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

	var templateToCompile = $('#tpl-loading').html();

	// Attach the template to the underscore function
	var compiled =  _.template(templateToCompile);

	// Send the data and display the result
	$('#view1').html(compiled());

	$.getJSON(gameUrl, function(json){
		console.log('data received');
		var getMatch = json.matches;
		appendData(getMatch);
	});
};

var getTable = function(){
	console.log('table got');
	var gameUrl = 'http://football-api.com/api/?Action=standings&APIKey=8929efd6-3749-914d-e0d1cc61d522&comp_id=1204';
	var templateToCompile = $('#tpl-loading').html();

	// Attach the template to the underscore function
	var compiled =  _.template(templateToCompile);

	// Send the data and display the result
	$('#matchtable').html(compiled());

	$.getJSON(gameUrl, function(json){
		console.log('table received');
		var getTeams = json.teams;
		appendTable(getTeams);
	});
};

var hashRouter = function(){
		
		$(window).off('hashchange').on('hashchange', function() {
	    	
	    	var currentPage = location.hash.substring(1, location.hash.length);
	        console.log('Current hash is ' + currentPage);
	        
			 if(currentPage === 'search'){
			 	$('#matchtable').hide();
			 	$('#matchsearch').show();

	        }else if(currentPage === 'table'){	
	        	$('#view1').empty();        	
	        	$('#matchsearch').hide();
	        	$('#matchtable').show();
	        	getTable();
	        	
	        }	        
	    });
    };


var appendData = function(data){
		console.log('Appending data.');

		// Let's clean up the results so we don't mess things up
		$('#view1').empty();
		// $('html, body').animate({
  //           scrollTop: $('#view1').offset().top + 'px'
  //       }, 'slow');
		if(data != null){
			for(var i = 0; i < data.length; i++){
				$('#view1').append('<p>' + data[i].match_localteam_name + " " + 
					data[i].match_localteam_score + " - " + 
					data[i].match_visitorteam_score + " " + 
					data[i].match_visitorteam_name + '</p>');
			}
		}else{
			$('#view1').append('<p>No match on this date</p>')
		}
	};

var appendTable = function(data){
	console.log('appending table');
	$('#matchtable').empty();
	if(data != null){
		for(var i = 0; i < data.length; i++){
				$('#matchtable').append('<table style="width:100%">'+
					  '<tr><td style="width:150px">' + data[i].stand_team_name + '</td>' + '<td style="width:50px">'+
					data[i].stand_round + '</td>' + '<td style="width:50px">'+
					data[i].stand_overall_w + '</td>' + '<td style="width:50px">'+
					data[i].stand_overall_d + '</td>' + '<td style="width:50px">'+
					data[i].stand_overall_l + '</td>' + '<td style="width:50px">'+
					data[i].stand_overall_gs + '</td>' + '<td style="width:50px">'+
					data[i].stand_overall_ga + '</td>' + '<td style="width:50px">'+
					data[i].stand_points + '</td>' + '</tr>' +
					'</table>'
					
					);
			}
		}else{
		$('#matchtable').append('<p> No data for table now</p>')
	}
};

//slide effect 
var slide = function(){
	console.log('slide');
	$('#menu').off('mouseover').on('mouseover',function(){
		$('#menu').css({left: 0});

	});
	$('#menu').off('mouseout').on('mouseout',function(){
		$('#menu').css({left: -141});

	});

};


var init = function(){
	hashRouter();
	inputDate();
	slide();

};

	return{
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);