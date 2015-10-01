/* Your code starts here */
var app = app || {};

app.main = (function() {

	var wordlist = [
	["life", "love", "world", "one", "day", "be", "few", "time", "cheer", "cave", "dew", "ice", "slow", "calm", "tree", "cloud", "nest", "cove", "real", "safe", "sky", "star", "us", "wine", "was", "earth", "wood", "wind", "rest", "skin", "warm", "cream", "the", "of"],
	["beside", "breathless", "dearest", "deeper", "endless", "morning", "planted", "softly", "sweeter", "after", "butter", "candy", "common", "enjoy", "hello", "penty", "puppy", "city", "finish", "forest", "fragile", "habit", "limit", "petal", "rapid", "relish", "river", "paper", "pony", "silent", "silence", "solo", "graceful", "lovely", "windy", "summer", "winter", "autumn" ,"spring", "whisper", "wonder", "mimic", "vigor", "flower", "forest", "moment", "unite"],
	["adventure", "beloved", "energy", "essential", "genuine", "perfection", "lavender", "lasagne", "poetry", "unconscious", "realize", "wonderful"],
	["ordinary", "capacity", "immunity", "variation", "invisible", "geometry", "peripheral", "relaxation", "eternity", "silhouette", "community", "infinity", "constellation", "absolution", "original", "awareness"],
	["alliteration", "electriciy", "imagination", "insignificant", "individual", "generosity", "evaporation", "velociraptor", "hippopotamus", "extraordinary", "infatuation", "refridgerator"]
	];

	var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	var syllables = 0;

	var whichWord = function(num){
		//picking random word from syllable list
		console.log(num);
		var listWords = wordlist[num];
		var rand = Math.floor(Math.random() * listWords.length);
		var word = listWords[rand];
		return word;
	}


	var getWord = function(input){
		//finding how many syllables for the letter
		for (var i = 0; i < alphabet.length; i++) {
			if (i <= 4 && input == alphabet[i]){
				syllables += 1;
				return whichWord(0);
			} else if (i > 4 && i <= 9 && input == alphabet[i]) {
				syllables += 2;
				return whichWord(1);
			} else if (i > 9 && i <= 14 && input == alphabet[i]) {
				syllables += 3;
				return whichWord(2);
			} else if (i > 14 && i <= 19 && input == alphabet[i]) {
				syllables += 4;
				return whichWord(3);
			} else if (i > 19 && i <= 26 && input == alphabet[i]) {
				syllables += 5;
				return whichWord(4);
			}
		}
	}

	var firstLine = 5;
	var secondLine = 7;
	var thirdLine = 5;
	var lineOne = [];
	var lineTwo = [];
	var lineThree = [];
	var syllablesLeft = 5;

	var makeHaiku = function(input){

		console.log("making haiku");
		console.log(input);

		lineOne.push(getWord(input[0]));
		console.log(lineOne);
		console.log(syllables);

		syllablesLeft -= syllables;

		while (syllablesLeft > 0) {
			var r = Math.floor(Math.random() * syllablesLeft);
			console.log(r);
			lineOne.push(whichWord(r));
			syllablesLeft -= (r+1);
		}

		console.log(lineOne);

	}

	var letters = [];
	var cleanup = function(input){
		console.log("input: " + input);
		cleanedUp = input.replace(/[^a-z]/ig, "");
		console.log("cleaned up: " + cleanedUp);
		letters = cleanedUp.split("");
		//makeHaiku(letters);
	}

	var listen = function(){
		console.log("listening for keypress");
		// var listener = new window.keypress.Listener();
		$('#smash-box').keyup(function() {
			console.log("key was pressed");
   			cleanup($(this).val());
		});
	}

	var loadingHaiku = function(){
		render('tpl-loading');
		makeHaiku(letters);
		setTimeout(render('tpl-display'), 3000);
	}

	var cleanedUp = "";

	var checkInput = function(){
		console.log("checking length of input");
		if (cleanedUp.length < 5) {
			console.log("type something");
			listen();
		} else {
			console.log("good");
			loadingHaiku();
		}
	}

	var render = function(div, data){ 
		console.log(div);
		console.log(data);
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