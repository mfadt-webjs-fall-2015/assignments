var app = app || {}; 

app.main = (function() { 

	var wordlist = [
	["life", "love", "world", "one", "day", "be", "few", "time", "cheer", "cave", "dew", "ice", "slow", "calm", "tree", "cloud", "nest", "cove", "real", "safe", "sky", "star", "us", "wine", "was", "earth", "wood", "wind", "rest", "skin", "warm", "cream", "the", "of"],
	["beside", "breathless", "dearest", "deeper", "endless", "morning", "planted", "softly", "sweeter", "after", "butter", "candy", "common", "enjoy", "hello", "penty", "puppy", "city", "finish", "forest", "fragile", "habit", "limit", "petal", "rapid", "relish", "river", "paper", "pony", "silent", "silence", "solo", "graceful", "lovely", "windy", "summer", "winter", "autumn" ,"spring", "whisper", "wonder", "mimic", "vigor", "flower", "forest", "moment", "unite"],
	["adventure", "beloved", "energy", "essential", "genuine", "perfection", "lavender", "lasagne", "poetry", "unconscious", "realize", "wonderful"],
	["ordinary", "capacity", "immunity", "variation", "invisible", "geometry", "peripheral", "relaxation", "eternity", "silhouette", "community", "infinity", "constellation", "absolution", "original", "awareness"],
	["alliteration", "electriciy", "imagination", "insignificant", "individual", "generosity", "evaporation", "velociraptor", "hippopotamus", "extraordinary", "infatuation", "refridgerator"]
	];

	var whichWord = function(num){
		//picking random word from syllable list
		// console.log(num);

		//using wordlist array
		var listWords = wordlist[num];

		//reading JSON file, NOT WORKING
		// $.getJSON("js/words.json", function(json){
		// 	console.log('Data received.');
		// 	console.log(json);

		// 	var listwords = json.wordlist[num];
		// });

		var rand = Math.floor(Math.random() * listWords.length);
		var word = listWords[rand];
		return word;
	}

	var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	var syllables = 0;

	var howManySyllables = function(_letter){
		//finding how many syllables for the letter
		for (var i = 0; i < alphabet.length; i++) {
			if (i <= 4 && _letter == alphabet[i]){
				syllablesLeft -= 1;
				return whichWord(0);
			} else if (i > 4 && i <= 9 && _letter == alphabet[i]) {
				syllablesLeft -= 2;
				return whichWord(1);
			} else if (i > 9 && i <= 14 && _letter == alphabet[i]) {
				syllablesLeft -= 3;
				return whichWord(2);
			} else if (i > 14 && i <= 19 && _letter == alphabet[i]) {
				syllablesLeft -= 4;
				return whichWord(3);
			} else if (i > 19 && i <= 26 && _letter == alphabet[i]) {
				syllablesLeft -= 5;
				return whichWord(4);
			}
		}
	}


	var getWords = function(_letter, _numSyll, _array){

		syllablesLeft = _numSyll;
		_array.push(howManySyllables(_letter));
		console.log(syllablesLeft + "syllables left");

		if (syllablesLeft >= 1) {
			var r = Math.floor(Math.random() * syllablesLeft);
			// console.log(r);
			_array.push(whichWord(r));
			syllablesLeft -= (r+1);
			console.log(syllablesLeft + " syllables left");
			//console.log("added word to " + _array);
		} else {
			console.log("line done");
		}
		
	}

	var lineOne = [];
	var lineTwo = [];
	var lineThree = [];
	var syllablesLeft;

	var makeHaiku = function(_input){

		console.log("making haiku");
		getWords(_input[0], 5, lineOne);
		console.log("line one : " + lineOne);
		getWords(_input[1], 7, lineTwo);
		console.log("line two : " + lineTwo);
		getWords(_input[2], 5, lineThree);
		console.log("line three : " + lineThree);

		render('tpl-display', {lines: [lineOne, lineTwo, lineThree]});

	}

	var loading = function(){

		render('tpl-loading');
		window.setTimeout(function() { makeHaiku(cleanedUp); }, 2000);
	
	}


	var cleanup = function(_input){

		console.log("input: " + _input);

		cleanedUp = _input.replace(/[^a-z]/ig, "");
		console.log("cleaned up: " + cleanedUp);

		checkInput(cleanedUp);

	}

	var listen = function(){

		console.log("listening for keypress");
		
		$('#smash-box').keyup(function() {
			console.log("key was pressed");
   			cleanup($(this).val());
		});
	}

	var cleanedUp = "";

	var checkInput = function(){

		console.log("checking length of input");
		
		if (cleanedUp.length < 5) {
			console.log("type something");
			listen();
		} else {
			console.log("good");
			loading();
		}
	}

	var render = function(div, data){ 
		
		var htmlTemplate = $('#' + div).html();
		var compiled = _.template(htmlTemplate);
		var compiledHtml = compiled(data);
		$('#container').html(compiledHtml);
	
	}

	var init = function(){

		console.log('Initializing app.');
		render('tpl-init');
		checkInput();
	
	};

	return {

		render: render,
		init: init

	};
})();

window.addEventListener('DOMContentLoaded', app.main.init);