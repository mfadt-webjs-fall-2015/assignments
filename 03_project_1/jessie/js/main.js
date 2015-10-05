var app = app || {};  

app.main = (function() { 

	var wordlist;
	
	var loadWords = function(){
		$.getJSON("js/words.json", function(json){
			wordlist = json;
		});
	}

	var attachBackEvent = function(){
		$('#back').click(function(){
			lineOne = [];
			lineTwo = [];
			lineThree = [];
			init();
		});
	}

	var whichWord = function(type, index){
		//picking random word from selected word list
		var listWords = wordlist[type][index];
		var rand = Math.floor(Math.random() * listWords.length);
		var word = listWords[rand];
		return word;			
	}

	var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	var syllables = 0;

	var nounSyllables = function(_letter){
		//finding how many syllables to use for nouns
		for (var i = 0; i < alphabet.length; i++) {
			if (i <= 4 && _letter == alphabet[i]){
				numSyl = 1;
				return whichWord('n', 0);
			} else if (i > 4 && i <= 9 && _letter == alphabet[i]) {
				numSyl = 2;
				return whichWord('n', 1);
			} else if (i > 9 && i <= 14 && _letter == alphabet[i]) {
				numSyl = 3;
				return whichWord('n', 2);
			} else if (i > 14 && i <= 19 && _letter == alphabet[i]) {
				numSyl = 4;
				return whichWord('n', 3);
			} else if (i > 19 && i <= 26 && _letter == alphabet[i]) {
				numSyl = 5;
				return whichWord('n', 4);
			}
		}
	}

	var adjSyllables = function(_letter){
		//finding how many syllables to use for adjs
		for (var i = 0; i < alphabet.length; i++) {
			if (i <= 13 && _letter == alphabet[i]){
				numSyl = 1;
				return whichWord('adj', 0);
			} else if (i > 13 && i <= 26 && _letter == alphabet[i]) {
				numSyl = 2;
				return whichWord('adj', 1);
			}
		}
	}

	var numSyl;
	var makeLineOne = function(_input){
		console.log("one start");
		syllablesLeft = 5;
		//find adjective
		var adj = adjSyllables(_input[0])
		lineOne.push(adj);
		syllablesLeft -= numSyl;
		//find noun
		var noun = nounSyllables(_input[1]);
		lineOne.push(noun);
		syllablesLeft -= numSyl;
		//find second noun if necessary
		if (syllablesLeft > 0) {
			var anotherNoun = whichWord('n', syllablesLeft-1);
			lineOne.push(anotherNoun);
		}
		console.log(lineOne);
	}

	var makeLineTwo = function(_input){
		console.log("two start")
		syllablesLeft = 5;
		//find adverb
		var adv = whichWord('adv', 0)
		lineTwo.push(adv);
		//find noun
		var noun = nounSyllables(_input[3]);
		lineTwo.push(noun);
		syllablesLeft -= numSyl;
		console.log(syllablesLeft + " left");
		//find adj
		var adj = adjSyllables(_input[4]);
		lineTwo.push(adj);
		syllablesLeft -= numSyl;
		//find another noun if necessary
		if (syllablesLeft > 0) {
			var anotherNoun = whichWord('n', syllablesLeft-1);
			lineTwo.push(anotherNoun);
		}
		console.log(lineTwo);
	}

	var makeLineThree = function(_input){
		console.log("three start");
		//conj, adj, noun
		syllablesLeft = 4;
		//conj
		var conj = whichWord('conj', 0)
		lineThree.push(conj);
		//adj
		var adj = adjSyllables(_input[5])
		lineThree.push(adj);
		syllablesLeft -= numSyl;
		//noun
		var anotherNoun = whichWord('n', syllablesLeft-1);
		lineThree.push(anotherNoun);
		console.log(lineThree);
	}

	var lineOne = [];
	var lineTwo = [];
	var lineThree = [];
	var syllablesLeft;

	var feelingsArray = [
		"what a beautiful haiku",
		"wow, I feel so much better",
		"doesn't that help now?",
		"is that pure poetry, or do I have a concussion now",
		"wow, just wow.",
		"did you shed a single tear?",
		"i hope your face is ok",
		"*ring ring* hello poet laureate speaking",
		"nothing like poetry to sooth the soul",
		"it's so touching",
		"you made this poetry with your face",
		"if you need another, i understand"
	]

	var makeHaiku = function(_input){
		makeLineOne(_input);
		makeLineTwo(_input);
		makeLineThree(_input);
		var rand = Math.floor(Math.random() * feelingsArray.length);
		render('tpl-display', {lines: [lineOne, lineTwo, lineThree], feelingsText: feelingsArray[rand]});
		attachBackEvent();
	}

	var loading = function(_input){
		render('tpl-loading');
		window.setTimeout(function() { makeHaiku(_input); }, 2000);
	}


	var cleanUp = function(_input){
		var cleanedUp = _input.replace(/[^a-z]/ig, "");
		return cleanedUp;
	}

	var debounce;
	var attachEvents = function(){
		$('#about-button').click(function(){
			render('tpl-about');
			attachBackEvent();
		})
		$('#smash-box').keyup(function() {
		    clearTimeout(debounce);
		    debounce = setTimeout(checkInput, 500);
		});
	}

	var checkInput = function(){
		if (cleanUp($('#smash-box').val()).length < 6) {
			render('tpl-error');
			attachBackEvent();
		} else {
			loading(cleanUp($('#smash-box').val()));
		}
	}

	var render = function(div, data){ 
		var htmlTemplate = $('#' + div).html();
		var compiled = _.template(htmlTemplate);
		var compiledHtml = compiled(data);
		$('#container').html(compiledHtml);
	}

	var init = function(){
		render('tpl-init');
		$('#smash-box').focus();
		loadWords();
		attachEvents();
	};

	return {
		render: render,
		init: init
	};
})();

window.addEventListener('DOMContentLoaded', app.main.init);