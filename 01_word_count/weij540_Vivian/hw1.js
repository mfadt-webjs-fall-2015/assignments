var wordCount = function(inputText){

//clean up text and space(s)
var cleanText = inputText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
cleanText = cleanText.replace(/\s{2,}/g," ");
//split text and sort it 
var splitText = cleanText.split(" ");
var sortText = splitText.sort();

var wordFreq = {};
//count word frequency
for(var i = 0; i < sortText.length; i++){
	var currentWord = sortText[i];
    if(wordFreq.hasOwnProperty(currentWord)){
        wordFreq[currentWord] ++;
    }else{
        wordFreq[currentWord] = 1;
    }
}

//push them into an array, and sort them in descending order 
var freqArray = [];
for (var word in wordFreq){
	if(wordFreq.hasOwnProperty(word)){
		freqArray.push({
			text: word,
			frequency: wordFreq[word]});
	}
}
freqArray.sort(function(a, b){
	if(a.frequency > b.frequency){return -1;}
	else if(a.frequency < b.frequency){return 1;}
	return 0;
});

//log the result inside of console
for (var j=0; j<freqArray.length; j++){
	console.log(freqArray[j].text + ": " + freqArray[j].frequency);
}

};

console.log("inside the console, call 'wordCount' function with input text");