
function wordCount(rawInput){
  var textCount = [];
 
//var pureText = rawInput.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    //pureText = pureText.replace(/\s{2,}/g," ");

//var str = pureText;
//var res = pureText.split(" ");
var res = rawInput.split();
console.log(res);
var counter = 0;
//var res = str.split(" ");
 for(var i = 0; i < res.lengh; i++) {
   for(var j = 0; j < res.lengh; j++) {
  if (res[i] == res[j]){
    counter ++;
    textCount.push(counter);
  }
   console.log("Holle world!!!!!!!!!!!!!!!!!!!!");
 }
     //console.log(res[i].text + ": " + counter);
     counter = 0;
 }

for(var i = 0; i < textCount.length; i++){

  var frequency = textCount[i];
  var word = res[i];
  console.log(word + ": " + frequency);
}

 return counter;

 
}

console.log("Holle world");
