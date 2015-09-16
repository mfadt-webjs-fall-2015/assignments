
var app = app || {};

app.main = (function(){


	var attachEvents = function(){
		var address = ['' ,''];
		$('#go-button').off('click').on('click', function(){
			address[0] = ($('#from').val());
			address[1] = ($('#to').val());
			locate(address, function(results){
				 console.log(results);
			});

			// var result = locate(address);
			// console.log(result);
		});	
	};
		
	// var locate = function(address){
	// 	var geocoder = new google.maps.Geocoder();
 //        var latlong = [];
	//     for(var i = 0; i < address.length; i++){
	//     	geocoder.geocode({address: address[i]}, function(results, status) {
	// 	        if (status === google.maps.GeocoderStatus.OK) {
	// 	        	for(var i = 0, num = results.length; i < num; i++){
	// 	        		latlong.push([results[i].geometry.location.lat(), results[i].geometry.location.lng()]);
	// 	        		// console.log (latlong);
	// 	        	}
	// 	        }
	//     	});
	//     }

	//     console.log(latlong);
	//     return latlong;
	// } 

	function locate(address, callback) {
	    var geocoder = new google.maps.Geocoder(),
	        latlong = [];

	    geocoder.geocode({address: address[0]}, function(results, status) {
	        if (status === google.maps.GeocoderStatus.OK) {
	            latlong.push([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
	            // console.log(results[0].geometry.location);
	            address.shift();
	            if (typeof callback === 'function') callback(latlong);

	            if (address.length === 0) {
	                return;
	            } else {
	                locate(address, callback);
	            }
	        }
	    });
	}

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