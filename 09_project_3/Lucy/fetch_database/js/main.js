/*
Lucy M Bonner
Web Advanced: Javascript

Fetch. Find Dog-Friendly Places
*/

var app = app || {};

app.main = (function() {

	var nameOfTheClass,
		dogFriendlyPlaceClass,
		dogPlaces;	
	var placeQuery;

	// FORM INPUT VARIABLES
	var placeName,
		placeRating,
		placeReview,
		placeType,
		placeCity;

	// MAP & GOOGLE PLACE API VARIABLES
	var locId,
        locName,
        locOpenNow,
        locRating,
        locWebsite,
        locAddress,
        locPhoneNumber,
        locGeoLoc,
        locLat,
        locLng;

    var marker;
    var infos = [];

	var map;
    var city = new google.maps.LatLng(29.7580,-95.3698); //Houston

    var cityLat,
    	cityLng;

    var geocoder;
   	var mobileLocation;

	function drawMap() {

		// GOOGLEMAPS attempt : I hate them and I dont want to use them but what choice do I have now.
		// style for map
            var styles = [
                {
                  stylers: [
                    { hue: "#00ffe6" },
                    { saturation: -20 }
                  ]
                },{
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                    { lightness: 100 },
                    { visibility: "simplified" }
                  ]
                },{
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                    { visibility: "off" }
                  ]
                }
            ];
            var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});

            var mapOptions = {
                center: city,
                zoom: 12,
                scrollwheel: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };

            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            // placesOnMap();

		// MAPBOX attempt
		// mapboxgl.accessToken = pk.eyJ1IjoibHVjeW1ib25uZXIiLCJhIjoiY2lpM2dvMDc3MDEwenRva2Z0YzIxOWNvaCJ9.93ig4CT6VcQwbJSmoJpPHg; // your access token
		// var map = new mapboxgl.Map({
		//     container: 'map', // container id
		//     style: 'mapbox://styles/mapbox/streets-v8', // your style URL
		//     center: [29.7580,-95.3698], // starting position
		//     zoom: 9 // starting zoom
		// });

		// LEAFLET attempt : WHAT IS GOING ON THIS HAS NEVER BEEN SO STROPPY BEFORE
		//initialize map into the "map" div LEAFLET
		// var map = L.map('map').setView([29.7580,-95.3698], 13);

		// //add in street view tile layer MAPBOX
		// L.tileLayer('https://api.mapbox.com/styles/v1/lucymbonner/cii3gp1tm002o91m2z98vjlfb.html?title=true&access_token=pk.eyJ1IjoibHVjeW1ib25uZXIiLCJhIjoiY2lpM2dvMDc3MDEwenRva2Z0YzIxOWNvaCJ9.93ig4CT6VcQwbJSmoJpPHg#0.5235618426898269/-1.4210854715202004e-13/0/0', {
		// 	maxZoom: 18,
		// 	scrollWheelZoom: false,
		//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>', 
		//     id: 'examples.map-i86nkdio'
		// }).addTo(map);

		// //add click functions
		// map.on('click',function(e){
		// 	onMapClick(e);
		// });
	}

	// RE-CENTER MAP TO NEW LOCATION ENTERED (DESKTOP)
	function centerMap(cityEntered) {
    	geocoder = new google.maps.Geocoder();
    	geocoder.geocode( { 'address': cityEntered}, function(results, status) {
	      	if (status == google.maps.GeocoderStatus.OK) {
	        	cityLat = results[0].geometry.location.lat();
	        	cityLng = results[0].geometry.location.lng();
	        	map.setCenter(results[0].geometry.location);
	        	city = new google.maps.LatLng(cityLat, cityLng);
	      	} else {
	        	console.log("Geocode was not successful for the following reason: " + status);
	      	}
    	});
    }

    // USE GEOLOCATION TO RECENTER MAP (MOBILE)
    function centerMapMobile(){
    	navigator.geolocation.getCurrentPosition(GetLocation);
		function GetLocation(location) {
		    cityLat = location.coords.latitude;
		    cityLng = location.coords.longitude;
		}
		mobileLocation = new google.maps.LatLng(cityLat, cityLng);
		map.setCenter(mobileLocation);
		cityFromLatLng(mobileLocation);
    }

    // USE MOBILE LOCATION TO FILTER RESULTS FROM DATABASE BY CITY : how to parse out??
  //   function cityFromLatLng(mobileLocation) {
  //   	geocoder.geocode({'location': mobileLocation}, function(results, status) {
		//     if (status === google.maps.GeocoderStatus.OK) {
		//     	if (results[1]) {
		//     		// need long_name of type.sublocality (city)
		//     		// formatted_address gives full address including city, but how to separate out for databse filter
		//			// https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding
		// 			mobileCity = results[1].address_components.type.sublocality;
		//     	} else {
		//     		console.log('No location results found from the given LatLng');
		//    		}
		//     } else {
		//       console.log('Error. Geocoder failed due to: ' + status);
		//     }
		// });
  //   }

	// map locations
	function requestPlace(searchCity, placeType, name){
		// Defining the arrays of Google Places types
        var all = ['food', 'restaurant',  'bakery', 'grocery_or_supermarket', 'meal_takeaway', 'bar', 'cafe', 'park', 'store', 'pet_store', 'veterinary_care', 'book_store', 'bicycle_store', 'clothing_store', 'department_store', 'electronics_store', 'florist', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store', 'shopping_mall'];
        var food = ['food', 'restaurant', 'cafe', 'bakery', 'grocery_or_supermarket', 'meal_takeaway'];
        var bars = ['bar'];
        var coffee = ['cafe'];
        var parks = ['park'];
        var shops = ['store', 'book_store', 'bicycle_store', 'clothing_store', 'department_store', 'electronics_store', 'florist', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store', 'shopping_mall']; 
        var dogNeeds = ['pet_store', 'veterinary_care'];

        var searchType = all;

        switch (placeType) {
            case 'Food':
                searchType = ['food', 'restaurant', 'cafe', 'bakery', 'grocery_or_supermarket', 'meal_takeaway'];
                break;
            case 'Bar':
                searchType = ['bar'];
                break;
            case 'Park':
                searchType = ['park'];
                break;
            case 'Coffee':
                searchType = ['cafe'];
                break;
            case 'Shopping':
                searchType = ['store', 'book_store', 'bicycle_store', 'clothing_store', 'department_store', 'electronics_store', 'florist', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store', 'shopping_mall'];
                break;
            case 'Dog Needs':
                searchType = ['pet_store', 'veterinary_care'];
                break;
            default:
                searchType = ['food', 'bar', 'cafe', 'park', 'store', 'pet_store', 'veterinary_care'];
                break;
        }

		// searchCity from typed in form value not used as it needs a specific geoLocation LatLng point for query
		// hopefully I can incorporate that eventually
		var request = {
                location: city,
                radius: '1000', // meters
                types: searchType,
                query: name
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callNewPlace);
	}

	function callNewPlace(results, status) {
		console.log('calling for Google Places data');
		if (status == google.maps.places.PlacesServiceStatus.OK) {
            var place = results[0];
            var marker = new google.maps.Marker({
                map: map,
                // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                animation: google.maps.Animation.DROP,
                place: {
                    placeId: results[0].place_id,
                    location: results[0].geometry.location,
                }
            });
            // ASSIGN VALUES TO NEW PLACE INFO
            	locGeoLoc = results[0].geometry.location;
            	locLat = results[0].geometry.location.lat();
            	locLng = results[0].geometry.location.lng();

                locId = results[0].place_id;
                locName = results[0].name;
                locRating = results[0].rating;
                locWebsite = results[0].website;
                locAddress = results[0].formatted_address;
                locPhoneNumber = results[0].formatted_phone_number;
                // locOpenNow = results[0].openNow;

        			// CREATE INFO MARKER
                    var infoWindowContent = '<div id="content">'+'<div id="siteNotice">'+'</div>'+
                        '<h5 id="placeNameHeadingMap">' + locName + '</h5>'+'<div id="placeRatingMap">'+
                        '<p>' + locAddress + '</br>Rating: '+ locRating + '</p>'+'</div>'+'</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });
                    // ADD MARKER TO MAP
                    google.maps.event.addListener(marker,'click',(function(marker,infoWindowContent,infowindow) {
                        return function() {
                            closeInfos();
                            infowindow.setContent(infoWindowContent);
                            infowindow.open(map,marker);
                            infos[0]=infowindow;
                        };
                    })(marker,infoWindowContent,infowindow));

            console.log('placeType set to: ' + placeType);
            console.log('placeCity set to: ' + placeCity);
            console.log('locName set to: ' + locName);
            console.log('locAddress set to: ' + locAddress);
            console.log('locPhoneNumber set to: ' + locPhoneNumber);
            console.log('locW set to: ' + locWebsite);
            console.log('locLat set to: ' + locLat);
            console.log('locLng set to: ' + locLng);
            console.log('locGeoLoc set to: ' + locGeoLoc);

            // SAVE NEW PLACE TO DATABASE
            savePlace( dogPlaces, {
            	Name: locName,
            	Type: placeType,
            	// placeLocation: locGeoLoc,	// Throws error for formatting in Parse
            	Lat: locLat,
            	Lng: locLng,
            	// Rating: locRating,		// Throws error for formatting in Parse
            	Site: locWebsite,
            	Address: locAddress,
            	phoneNumber: locPhoneNumber,
            	City: placeCity
            });
        } else {
            console.log("ERROR with google.maps.places.PlacesServiceStatus: " + status);
        }
	}
	function closeInfos(){
        /* If there are infoWindows open on the map */
        if(infos.length > 0){    
            /* detach the info-window from the marker */
            infos[0].set("marker", null);
                /* and close it */
            infos[0].close();
                /* blank the array */
            infos.length = 0;
        }
    }

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
		// CITY INPUT SUMBIT
		$('#citySubmit').click(function(){
			console.log('CLICKED GO');
			cityEntered = $('#cityEntered').val();
			//reset fields to blanks
			$('#cityEntered').val("");
			$( ".cityFinderBox" ).css("display","none");
			console.log('City Location Entered: ' + cityEntered);

			centerMap(cityEntered);
		});

		// INPUT FORM SUBMIT
		$("#submit").click(function() {
			placeCity = $('#cityLocation').val();
			placeName = $('#newPlaceName').val();
			// placeRating = $('#newPlaceRating').val();
			// placeReview = $('#newPlaceReview').val();
			placeType = $('#newPlaceType').val();

			//reset fields to blanks
			$('#cityLocation').val("");
			$('#newPlaceName').val("");
			// $('#newPlaceRating').val("");
			// $('#newPlaceReview').val("");
			$('#newPlaceType').val("");

			console.log("place city: " + placeCity);
			console.log("place name: " + placeName);
			console.log("place type: " + placeType);
			// console.log("place rating: " + placeRating);
			// console.log("place review: " + placeReview);

			// GOOGLE PLACE API CALL TO FIND OFFICIAL INFO & GEO-LOCATION
			requestPlace(placeCity, placeType, placeName);

			// SAVE NEW PLACE TO DATABASE
			// savePlace(dogPlaces, {
			// 	Name: placeName,
			// 	Type: placeType,
				// Review: placeReview,
				// Rating: placeRating,
			// });
		});
		// ICONS
		$('#foodIcon').click(function(){
			// clear out markers from previous searches
			drawMap();
			// get places from database
			fetchPlace('Type', 'Food', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>FOOD</h1>" );
		});
		$('#barsIcon').click(function(){
			drawMap();
			fetchPlace('Type', 'Bars', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>BARS</h1>" );
		});
		$('#shopsIcon').click(function(){
			drawMap();
			fetchPlace('Type', 'Shopping', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>SHOPPING</h1>" );
		});
		$('#coffeeIcon').click(function(){
			drawMap();
			fetchPlace('Type', 'Coffee', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>COFFEE</h1>" );
		});
		$('#parkIcon').click(function(){
			drawMap();
			fetchPlace('Type', 'Parks', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>PARKS</h1>" );
		});
		$('#dogIcon').click(function(){
			drawMap();
			fetchPlace('Type', 'Dog Needs', placeQuery);
			$('html, body').animate({
            	scrollTop: $('#homeType').offset().top
            }, 'slow');
            $( "#cityFinderBox" ).css("display","none");
            $( ".typeTitleMap" ).css("display","block");
            $( ".typeTitleMap" ).empty();
            $( ".typeTitleMap" ).append( "<h1>DOG NEEDS</h1>" );
		});
	}

	function initParse(callback){
	    Parse.initialize("oBupJcpfVonxSWGNOX9XzCy5ceZYSLNbjsHqkAYH", // APP ID
	    				 "Vrqbk9OREHHZxj0ugnkut2LrIuTLo98l31NCdbIf");	// JS KEY
		nameOfTheClass = 'Place';

		dogFriendlyPlaceClass = Parse.Object.extend(nameOfTheClass); // Parse Class Object
		dogPlaces = new dogFriendlyPlaceClass(); // Instance of class

	    placeQuery = new Parse.Query(nameOfTheClass);

	    console.log("parse initialized.");

	    callback();
	}

	var savePlace = function(parseClass, name){
		console.log('Attempting to save new location.');

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

	function fetchAllPlaces(city, parseFetch){
		$( ".typeTitleMap" ).css("display","none");

		// var shoppingQuery = new Parse.Query("Place");
		// shoppingQuery.equalTo('Type', 'Shopping');

		// var foodQuery = new Parse.Query("Place");
		// foodQuery.equalTo('Type', 'Food');

		// var parkQuery = new Parse.Query("Place");
		// parkQuery.equalTo('Type', 'Parks');

		// var barsQuery = new Parse.Query("Place");
		// barsQuery.equalTo('Type', 'Bars');

		// var coffeeQuery = new Parse.Query("Place");
		// coffeeQuery.equalTo('Type', 'Coffee');

		// var dogNeedsQuery = new Parse.Query("Place");
		// dogNeedsQuery.equalTo('Type', 'Dog Needs');

		// var allQuery = Parse.Query.or(shoppingQuery, foodQuery, parkQuery, coffeeQuery, dogNeedsQuery, barsQuery);
		// allQuery.find({
		parseFetch.equalTo('City', city)
		.find({
  			success: function(results) {
     			results.forEach(function(item) {
					var name = item.get('Name');
					var type = item.get('Type');
					var address = item.get('Address');
					var phone = item.get('phoneNumber');
					var lat = item.get('Lat');
					var lng = item.get('Lng');

					// console.log('lat: ' + lat);
					// console.log('lng: ' + lng);

					mapData(name, address, phone, lat, lng);
				});
  			},
  			error: function(error) {
    			console.log(err);
 			 }
		});
	}
	// USE ENTERED CITY OR GEOLOCATION OF PHONE TO PARSE DATABSE FOR THAT LOCATION
	function fetchPlaceByCity(property, value, parseFetch) {
		// no set "and" constraints for queries, though an "or"
		// near end of: https://parse.com/docs/js/guide#queries
		// says should be a way, but does not specify syntax ???
		// lots of forums ask this question, but cant find one yet that answers it...

		// perhaps another query nested in the success results of the first? 

	}
	// PULL SPECIFIC TYPE OF DOG-FRIENDLY PLACE FROM DATABASE
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
								var address = item.get('Address');
								var phone = item.get('phoneNumber');
								var lat = item.get('Lat');
								var lng = item.get('Lng');

								// console.log('lat: ' + lat);
								// console.log('lng: ' + lng);

								mapData(name, address, phone, lat, lng);
								appendData(name, type, address, phone);
							});
						},
						error: function(err) {
							console.log(err);
						}
					});
	};
	// LIST RESULTS INTO VIEW SECTION
	function appendData(name, type, address, phone){
		$('#place-list').append('<p class="title">' + name + '</p>');
		$('#place-list').append('<p class="address">' + address + '</p>');
		if ( phone != 'undefined'){
			$('#place-list').append('<p class="phone">' + phone + '</p><br>');
		}
	};
	// PUT SELECTED TYPE OF PLACE ONTO MAP
	function mapData(name, address, phone, lat, lng){

		lat = parseFloat(lat);
		lng = parseFloat(lng);

		// console.log('lat: ' + lat);
		// console.log('lng: ' + lng);

		// alert(lat + " " + lng + " (types: " + (typeof lat) + ", " + (typeof lng) + ")");

		var latlng = new google.maps.LatLng(lat, lng);

		var marker = new google.maps.Marker({
                map: map,
                // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                animation: google.maps.Animation.DROP,
                position: latlng
                // place: {
                //     location: latlng
                // }
        });
        // CREATE INFO MARKER
        var infoWindowContent = '<div id="content">'+'<div id="siteNotice">'+'</div>'+
            '<h5 class="placeNameHeadingMap">' + name + '</h5>'+'<div class="placeInfoMap">'+
            '<p>' + address + '</br>'+ phone + '</p>'+'</div>'+'</div>';

        var infowindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
        // ADD MARKER TO MAP
        google.maps.event.addListener(marker,'click',(function(marker,infoWindowContent,infowindow) {
            return function() {
                closeInfos();
                infowindow.setContent(infoWindowContent);
                infowindow.open(map,marker);
                infos[0]=infowindow;
            };
        })(marker,infoWindowContent,infowindow));
	};

	// UPDATE
	// var updatePlace = function(obj, property, value){
	// 	obj.set(property, value);
	// 	obj.save();
	// };

	var init = function(){

		initParse(function(){
			drawMap();
			// Initialize map with all Houston locations
			fetchAllPlaces('Houston', placeQuery);
			// drawMap(function(){
			// 	service.textSearch(request, callPlaceLocation);
			// });
			attachEvents();
		});
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);