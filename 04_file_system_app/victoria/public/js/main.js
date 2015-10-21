/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){
		$('.voc').off('click').on('click', function(){
			loaddef($(this).html());
		});
	};

	var loadVoc = function(voc){
		$.getJSON('/vocList', function(response){
			for(var i = 0; i < response.length; i++){
				$("#vocHolder").append('<div class="voc" id=' + response[i] + '>' + response[i] + '</div>');
			}
			attachEvents();
		});	
	};

	var loaddef = function(voc){
		$.post('/def', {
			voc: voc
		}, function(response) {
        	console.log(response);
        	$('#data').empty();
        	$('#data').append('<p>The defination of <b>' + response['voc'] + '</b> is:</p>');
        	for(var prop in response['def']){
				$('#data').append('<p>' +response['def'][prop] + '</p>');
        	}
	    });
	};

	var AddNew = function(){
		var newVoc = $("#newVoc").val();
		var newDef = $("#defination").val();
		$.post('/addNew',{newVoc:newVoc,newDef:newDef});
		location.reload();
	}

	var init = function(){
		console.log('Initializing app.');
		loadVoc();
		$("#sub").click(function(){
			AddNew();
		});
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);