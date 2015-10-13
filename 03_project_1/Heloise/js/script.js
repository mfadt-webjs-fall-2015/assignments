var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	//variables
	var tag1 = "";
	var UserId = 'cf2ae2e97b404373b7203e7c03d65db7';
	var myPicUrl;
	var myPic2Url;

	var loadPic = function(response){	
		//log the response object
		console.log(response);
		var icon = response.data[0].images.low_resolution.url;
		$('#img2').css({'background-image':'url('+icon+')'});
		console.log(icon);

	};

	var loadPic2 = function(response){
		
		console.log(response);	
		var iconSec = response.data[0].images.low_resolution.url;
		$('#imginner').html('<img src="' + iconSec + '" width="306">');
		console.log(iconSec);
	};


	var getPic = function(){

		var thisURL = "https://api.instagram.com/v1/tags/"+tag1+"/media/recent?client_id=" + UserId 
		var thisURL2 = "https://api.instagram.com/v1/tags/"+tag2+"/media/recent?client_id=" + UserId 
		$.ajax({
			url : thisURL,
			dataType : "jsonp",
			success : function(response) {
				loadPic(response);			
			}
		});
		$.ajax({
			url : thisURL2,
			dataType : "jsonp",
			success : function(response) {
				loadPic2(response);			
			}
		});
	};

	var setTag = function(){
		tag1 = $('.tag1').val();
		tag2 = $('.tag2').val();	
		if(tag1 == null || tag1 == ''){
			alert('You need to list a tag!');
			return;
		};	
		getPic();
	};


	//init
	var init = function(){
		$('#button').click(function(e){
			e.preventDefault();
			setTag();
		});
		
	};


	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
