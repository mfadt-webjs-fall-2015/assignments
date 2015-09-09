// //HW #1-Word Frequency Counter

var wordCount = function(myText){

var text = document.getElementById("myText").value.split(" ");

var wordFreq = {};

for(var i = 0; i < text.length; i++){
    var thisWord = text[i];
    if(wordFreq.hasOwnProperty(thisWord)){
        wordFreq[thisWord]++;
    }else{
        wordFreq[thisWord] = 1;
    }
}
////initial attempt trying to write to "analysis" element in HTML

// for(var word in wordFreq){
// 	    var label = word;
//      var analysis = wordFreq[word];
//      console.log(word, wordFreq[word]);
 

for(var word in wordFreq){
     ////trying to create an object and push data to object...?
    var words = [];
    var wordsFrequency = [];
     var paragraph = { 
         label: word,
         frequency: wordFreq[word]
    };
    words.push(paragraph.label);
    wordsFrequency.push(paragraph.frequency);
    console.log("word: "+words+"  frequency: "+wordsFrequency);

    ////having trouble writing to HTML "analysis"  

    for (var i = 0; i < text.length; i++){

        document.getElementById("analysis").innerHTML = "Word: " +words + "  Frequency: " + wordsFrequency;

        }

    }
}

// document.getElementById("counter").innerHTML = label + ": " + analysis;
// }


