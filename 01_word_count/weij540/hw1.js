var wordCount = function(inputText){

var cleanText = inputText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
var sortText = cleanText.split(" ");
var wordFreq = {};

for(var i = 0; i < sortText.length; i++){
	var currentWord = sortText[i];
    if(wordFreq.hasOwnProperty(currentWord)){
        wordFreq[currentWord] ++;
    }else{
        wordFreq[currentWord] = 1;
    }
};

for(var result in wordFreq){
    console.log(result + ": " + wordFreq[result]); 
};

};

console.log("inside the console, call 'wordCount' function with input text")
wordCount("text");