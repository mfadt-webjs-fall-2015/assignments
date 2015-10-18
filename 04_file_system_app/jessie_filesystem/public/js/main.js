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

	//write poop.txt
	//HOW DO MAKE myFilePath be a random selection from dirs[] in app.js?
	var writeShit = function(myfilePath) {
		$.post(
			'/writeFile',
			{ filePath: myfilePath + "/some_shit.txt",
			  content: 'poop' },
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
		writeShit: writeShit
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);