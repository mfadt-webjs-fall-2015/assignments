/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var sketch = new p5(introSketch, "sketchCanvas");
	var getFiles = function(city){
		$.post('/files', //the address. post request
			 {files: 'myDocuments'},				// the data im sending
			 function(response){ //callback function (once a response comes through)
			 	// console.log(response);
			 	sketch.setup2(response);
			 }
		); //jquery function
	};
	getFiles();

	var init = function(){
		console.log('Initializing app.');
	};



	return {
		init: init,
		getFiles: getFiles
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);