var countWords = function(text){

var words = text.split(/\s/);

var wordsNumber = words.length;
	console.log(words.length);


document.getElementById("results").innerHTML = wordsNumber-1;
};
