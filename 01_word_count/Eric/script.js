function wordCount(rawInput){

	//formating, get rid of puncs and accident inputs
	var pureText = rawInput.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	pureText = pureText.replace(/\s{2,}/g," ");

	//split words into an array
	var splitText = pureText.split(" ").sort();
	
	console.log ("split text: " + splitText);
	console.log ("word count: "+ splitText.length + " words");

	var result = frequencyCount (splitText);
	function compare (a,b){
		if (a.freq < b.freq){
			return 1;
		}
		if (a.freq > b.freq){
			return -1
		}
		return 0;
	}
	result.sort(compare);

	// console.log(result);
	for(var i = 0; i < result.length; i++){
		var obj = result[i];
		console.log("word: " + obj.text + " | "+"frequency: " + obj.freq);
	}
}


function frequencyCount (splitText){

	var counter = 1;
	var resultArray = []; 
	var resultWord;

	for(var i = 0; i < splitText.length; i++){
		var currWord = splitText[i];
		var nextWord = splitText[i+1];
		if(currWord == nextWord){
			counter++;
		}
		else{
			resultWord = {
				text: currWord,
				freq: counter
			};
			resultArray.push(resultWord);
			counter = 1;
		}
	}
	return resultArray;
}