
var app = app || {};

app.main = (function(){

	var locate = function (address, callback){
		var latlong = [];
		var geocoder = new google.maps.Geocoder();
		if (geocoder) {
      		geocoder.geocode({ 'address': address[0] }, function (results, status) {
	         	if (status == google.maps.GeocoderStatus.OK) {
	         		// latlong.push(results[0].geometry.location);
	         		latlong.push([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);  
	         		address.shift();
	         		if (typeof callback === 'function') {
	         			callback(latlong);
	         		}
	         		if (address.length === 0) {
	         			return;
	         		}
	         		else{
	         			locate(address, callback);
	         		}

	         	}
	        	 else {
	         		console.log("Geocoding failed: " + status);
	         	}
     	 	});
    	} 
	}

	var fetchLocations = function(obj, addressToUber){
		if (addressToUber.length == 2) {
			getUberPrice(addressToUber);
		}
		else{
			addressToUber.push(obj);
		}
	}

	var getUberPrice = function(addressToUber){
		var startLat = addressToUber[0][0][0];
		var startLng = addressToUber[0][0][1];
		var endLat = addressToUber[1][1][0];
		var endLng = addressToUber[1][1][1];
	}

	var init = function(){
		var address = ['' ,''];
		var addressToUber = [];
		$('#go-button').off('click').on('click', function(){
			address[0] = ($('#from').val());
			address[1] = ($('#to').val());
			locate(address, function(obj){
				fetchLocations(obj, addressToUber);
			});
		});	
	};
	return {
		init: init
	};

})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);