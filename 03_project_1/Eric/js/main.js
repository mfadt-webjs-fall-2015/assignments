
var app = app || {};

app.main = (function(){

	var locate = function (address, callback){
		var latlong = [];
		var geocoder = new google.maps.Geocoder();
		if (geocoder) {
      		geocoder.geocode({ 'address': address[0] }, function (results, status) {
	         	if (status == google.maps.GeocoderStatus.OK) {
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
			addressToUber.length = 0;
		}
		else{
			addressToUber.push(obj);
		}
	}

	var getUberPrice = function(addressToUber){
		console.log(addressToUber[0][0][0], addressToUber[0][0][1]);
		var startLat = addressToUber[0][0][0];
		var startLng = addressToUber[0][0][1];
		var endLat = addressToUber[1][0][0];
		var endLng = addressToUber[1][0][1];
		var serverToken = 'RsQSnU210NSFmoLa1WXsC5QmQe3lQdIsAB5A-b-X';
		var apiCallLink = "https://api.uber.com/v1/estimates/price?"+"start_latitude="+startLat+"&"+"start_longitude="+startLng+"&"+"end_latitude="+endLat+"&"+"end_longitude="+endLng+"&server_token="+serverToken;
		$.getJSON(apiCallLink, function(obj){
			for (var i = 0; i < obj.prices.length; i++) { 
    			var carType = obj.prices[i].localized_display_name;
    			if (carType != "Yellow WAV") {
    				var cost = obj.prices[i].estimate;
    				var distance = obj.prices[i].distance;
    				var duration = obj.prices[i].duration;
    				$('#car-result').append("<p>" + "car: " + carType + " | " +"duration: " + Math.round(duration / 60) + "mins" + " | " + "distance: " + distance + "miles" + " | " + "cost: " + cost + "</p>");
    			};
			}
		});
	}

	var init = function(){
		var address = ['' ,''];
		var addressToUber = [];
		$('#go-button').off('click').on('click', function(){
			address[0] = ($('#from').val()); //address input eg: union square, NY
			address[1] = ($('#to').val());
			$('#car-result').html(' ');
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