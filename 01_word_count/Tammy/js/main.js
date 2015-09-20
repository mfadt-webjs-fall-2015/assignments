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

    console.log(wordFreq);

    // Let's make the list a simple string
    var htmlContent = "";
    for(var word in wordFreq){
        // +=, so we're adding a new line each time
        htmlContent += word + ": " + wordFreq[word] + "<br/>";  // line break!
    }
    document.getElementById("analysis").innerHTML = htmlContent;
}

