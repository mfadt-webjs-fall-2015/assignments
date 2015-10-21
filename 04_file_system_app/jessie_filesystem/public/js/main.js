var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var attachEvents = function(){

	};

	var init = function(){
		console.log('Initializing app.');
	};

	//read a file
	var readFile = function(myfilePath){
		$.post(
			'/readFile',
			{ filePath: myfilePath },
			function(res){
				console.log(res);
			}
		)
	}

	//write a file
	var writeFile = function(myfilePath, myContent) {
		$.post(
			'/writeFile',
			{ filePath: myfilePath,
			  content: myContent },
			function(res){
				console.log(res)
			}
		)
	}

	//read and list out everything in a directory
	var readDir = function(myDir){
		$.post(
			'/readDir',
			{ directory: myDir },
			function(res){
				console.log(res);
			}
		)
	}

	//find a random directory
	var findDir = function(myPath){
		$.post(
			'/findDir',
			{ currentPath: myPath },
			function(res){
				console.log(res);
			}
		)
	}

	//NOT WORKING, NOTES IN APP.JS
	var writeShit = function() {
		$.post(
			'/writeShit',
			// { filePath: myfilePath + "/some_shit.txt",
			  // content: 'shit' },
			function(res){
				console.log(res)
			}
		)
	}

	return {
		init: init,
		readFile: readFile,
		writeFile: writeFile, 
		readDir: readDir,
		findDir: findDir,
		writeShit: writeShit
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);