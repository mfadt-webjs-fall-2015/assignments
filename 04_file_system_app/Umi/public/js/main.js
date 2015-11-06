/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){
		$('.food').off('click').on('click', function(){
			loadFoodname($(this).html());
		});
	};

	var loadABC = function(city){
		$.getJSON('/food_db', function(response){
			for(var i = 0; i < response.length; i++){
				$("#container").append('<div class="food" id=' + response[i] + '>' + response[i] + '</div>');
			}
			attachEvents();
		});	
	};

	var loadFoodname = function(food){
		$.post('/foodname', {
			food: food
		}, function(response) {
        	console.log(response);
        	$('#data').empty();
        	
        	for(var prop in response['foodname']){
				$('#data').append('<div class="examples">' + response['foodname'][prop] + '</div>');
        	}
	    });
	};

	var init = function(){
		console.log('Initializing app.');
		loadABC();	
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);