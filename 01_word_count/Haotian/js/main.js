console.log('count number function');
var content = prompt("type something");

var countWords = function (content){
	console.log("how many word:" +content.split(" ").length);
};


countWords(content);

var str = content.split(" ");

var words = {};
var wordsArr = [];

for(var i=0; i<str.length; i++){
	if(!words.hasOwnProperty(str[i])){
		words[str[i]]= 1
	}
	else{
		words[str[i]]++
	}
};

for (var key in words) {
		if  (words.hasOwnProperty(key)) {
			wordsArr.push({word: key, freq: words[key]});
		}
	}

wordsArr.sort(function(a, b) {
		if (a.freq > b.freq) {
			return -1;
		}
		else if (a.freq < b.freq) {
			return 1;
		}
		return 0;
	});

for (var i=0; i<wordsArr.length ; i++){
	console.log(wordsArr[i].word + " : " + wordsArr[i].freq);
}


