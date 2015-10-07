var app = app || {};

app.main = (function() {

	var nameOfTheClass,
		dogFriendlyPlaceClass,
		dogPlaces;	
	var placeQuery;

	var placeName,
		placeRating,
		placeReview,
		placeType;

	function attachEvents() {
		// NAV
		$('#addNav').click(function(){
			$('html, body').animate({
            	scrollTop: $('#addNew').offset().top
            }, 'slow');
		});
		$('#typeNav').click(function(){
			$('html, body').animate({
            	scrollTop: $('#browseType').offset().top
            }, 'slow');
		});
		// FORM SUBMIT
		$("#submit").click(function() {
			placeName = $('#newPlaceName').val();
			placeRating = $('#newPlaceRating').val();
			placeReview = $('#newPlaceReview').val();
			placeType = $('#newPlaceType').val();

			//reset fields to blanks
			$('#newPlaceName').val("");
			$('#newPlaceRating').val("");
			$('#newPlaceReview').val("");
			$('#newPlaceType').val("");

			console.log("place name: " + placeName);
			console.log("place type: " + placeType);
			console.log("place rating: " + placeRating);
			console.log("place review: " + placeReview);

			// save place to database
			savePlace(dogPlaces, {
				Name: placeName,
				Type: placeType,
				Review: placeReview,
				Rating: placeRating
			});
		});
		// ICONS
		$('#foodIcon').click(function(){
			fetchPlace('Type', 'Food', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
		$('#barsIcon').click(function(){
			fetchPlace('Type', 'Bars', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
		$('#shopsIcon').click(function(){
			fetchPlace('Type', 'Shopping', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
		$('#coffeeIcon').click(function(){
			fetchPlace('Type', 'Coffee', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
		$('#parkIcon').click(function(){
			fetchPlace('Type', 'Parks', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
		$('#dogIcon').click(function(){
			fetchPlace('Type', 'Dog Needs', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#view').offset().top
            }, 'slow');
		});
	}

	function initParse(){
	    Parse.initialize("oBupJcpfVonxSWGNOX9XzCy5ceZYSLNbjsHqkAYH", // APP ID
	    				 "Vrqbk9OREHHZxj0ugnkut2LrIuTLo98l31NCdbIf");	// JS KEY
		nameOfTheClass = 'Place';

		dogFriendlyPlaceClass = Parse.Object.extend(nameOfTheClass); // Parse Class Object
		dogPlaces = new dogFriendlyPlaceClass(); // Instance of class

	    placeQuery = new Parse.Query(nameOfTheClass);

	    console.log("parse initialized.");
	}

	var savePlace = function(parseClass, name){

		parseClass.save(name, {
			success: function(res){
				console.log('Saved place.');
				console.log(res);
			},
			error: function(res, err){
				console.log('Error: ' + err);
			}
		});
	};

	function fetchPlace(property, value, parseFetch){
		$('#view').empty();
		$('#view').append('<div id="place-list"><h1 id="typeLabel">' + value + '</h1></div>')
		parseFetch.equalTo(property, value)
					.find({
						success: function(obj) {
							console.log(obj);
							obj.forEach(function(item){
								// what to do with each object
								console.log(item.get('Name'));
								var name = item.get('Name');
								var type = item.get('Type');
								var rating = item.get('Rating');
								var review = item.get('Review');
								appendData(name, type, rating, review);
							});
						},
						error: function(err) {
							console.log(err);
						}
					});
	};
	function appendData(name, type, rating, review){
		$('#place-list').append('<p class="title">' + name + '</p>');
		$('#place-list').append('<p class="rating">Rating: ' + rating + '</p>');
		$('#place-list').append('<p class="review">' + review + '</p><br>');
	};

	// UPDATE
	var updatePlace = function(obj, property, value){
		obj.set(property, value);
		obj.save();
	};

	var init = function(){

		attachEvents();
		initParse();

	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);