/*JavaScript here*/

//var input = 'abc def abc def xyz abc azz define';

var wordFreq = {};
var wordFreqArr = [];
var responseHTML;
submit = document.getElementById('submit');
response = document.getElementById('response');

submit.addEventListener("click", function (e) {
    input = document.getElementById('input').value;
    calculateWordFreq();
});

function filterByWord(obj) {
	if ('word' in obj && (obj.word == "" || /\u00AD+/.test(obj.word))) {
		return false;
	}
	return true;
}

function calculateWordFreq() {
	input = input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ");
	var words = input.split(' ');
//	console.log(words);

	for (var i = 0; i < words.length; i++){
	    var thisWord = words[i];
	    if (wordFreq.hasOwnProperty(thisWord)) {
	        wordFreq[thisWord]++;
	    }
	    else {
	        wordFreq[thisWord] = 1;
	    }
	}

	for (var key in wordFreq) {
		if  (wordFreq.hasOwnProperty(key)) {
			wordFreqArr.push({word: key, freq: wordFreq[key]});
		}
	}

	wordFreqArr.sort(function(a, b) {
		if (a.freq > b.freq) {
			return -1;
		}
		else if (a.freq < b.freq) {
			return 1;
		}
		return 0;
	});

	wordFreqArr = wordFreqArr.filter(filterByWord);

//	console.log(wordFreqArr);

	responseHTML = "<table>";
	for (var i = 0; i < wordFreqArr.length; i++) {
		if (i===3) {
			console.log('blah', wordFreqArr[i].word.length);
		}
		responseHTML += "<tr><td class=\"response-word\">" + wordFreqArr[i].word + "</td><td class=\"response-freq\">" + wordFreqArr[i].freq + "</td></tr>";
	}
	responseHTML += "</table>";
	response.innerHTML = responseHTML;

	for(var key in wordFreq){
	    // console.log(key, wordFreq[key]);
	    // console.log(wordFreq);
	}

}