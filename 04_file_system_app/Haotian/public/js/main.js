/* Your code starts here */

var app = app || {};

app.main = (function() {
	
	var getText = function(){
		console.log('text got');	
		$('#input-button').off('click').on('click', function(){
			  saveText($('#input-box').val());
		});
		$('#input-box').off('click').on('click', function(){
			  saveText($('#input-box').val());
		});
	};

	var saveText = function(textToSave){
		$.post('/saveText',{text:textToSave},function(response){
			console.log(response);
			showText(response);
		});

	};

	var showText = function(response){
		$('#output').empty();
		$('#output').append('<p>' + response['text'] + '</p>');
	};
	
	var init = function(){
		console.log('Show Text App');
		getText();
	};

	return {
		init:init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);