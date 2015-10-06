function wordCount(rawInput){
  //Get pureText words
   var pureText = rawInput.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  pureText = pureText.replace(/\s{2,}/g," ");

  var splitText = pureText.split(" ").sort();

  var Amount = splitText.length;
  console.log(Amount);
  var result = wordFrequency (splitText);
  for(var i = 0; i< result.length; i++){
    var thisWord = result[i];
  console.log("word: " + thisWord.word + "   " + "frequency: " + thisWord.freq);
  }
}

function wordFrequency (splitText){

  var textArr = splitText;
  var arrCounter = [];
  var holder = [];
  var counter =1;

  for (var i = 0; i < textArr.length; i++) {
       if(arrCounter.hasOwnProperty(textArr[i])){
          arrCounter[textArr[i]] ++;
       }else{
           holder = {
            word: textArr[i],
            freq: 1
           };
           arrCounter.push(holder);
           counter =1;
       }
       
     }
       return arrCounter;
}