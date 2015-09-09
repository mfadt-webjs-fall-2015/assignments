function countWords(myString) {

	var textInput = myString.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
	textInput = textInput.replace(/\s{2,}/g," "),
	textArray = textInput.split(" ").sort(),
	numWords = textArray.length,
	counted = [],
	wordCount = 1,
	words = counted;


	for (var i=0; i<textArray.length; i++){
		var currentWord = textArray[i];
		if(textArray[i+1] == currentWord){
			wordCount++;
		} else {
			counted.push([wordCount,textArray[i]]);
			wordCount = 1;
		}
	}

    textArray = counted.sort();

    for (var i=0; i<words.length; i++) {
    	console.log(words[i][0] + " : " + words[i][1]);
    }
    console.log("words:" + numWords);
};	

	







