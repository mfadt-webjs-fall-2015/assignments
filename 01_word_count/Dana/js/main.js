var value = "";
var ary;
var aryCopy = [];
var times = 0;
var count = [];
var word = []; 
var currentWord;
var PosOfWord = 0;


//on click get the value of the input
$("#button").click(function(){
$('#wordRepeatCount').empty();
  value = $("#myText").val();
  console.log(value);
  analyze();
  $('display').empty();


});
//analyze it
function analyze(){
	ary = value.split(" ");
	hasDuplicates();
	display();
}

function hasDuplicates(){

	for(var i=0; i< ary.length; i++){
		
		//if the value is inside valuesSoFar
		if(aryCopy.indexOf(ary[i]) != -1 && word.indexOf(ary[i]) == -1) {
			
			word.push(ary[i]);
			currentWord = word[PosOfWord];
			PosOfWord++;
				for(var x=0; x< ary.length; x++){ // loop checks how many times the string in position ary[i] is in all of "ary"
            		if(ary[x] == currentWord){ 
            			times++;  
            		}
            	}   
            count.push(times);   
            times=0; 
            
	
		}
		aryCopy.push(ary[i]);

		
		// document.getElementById('wordRepeatCount').innerHTML= ary[i] + number;
		
	}
 }



//display
function display(){
	document.getElementById('display').innerHTML= "word count: " + "<span style='font-size:200px'>" + ary.length + "</span>";
	$('#wordRepeatCount').append("words repeated: <br>") ;

	for (var j = 0; j < word.length; j++) {
	 	$('#wordRepeatCount').append( word[j] + " <span style='font-size:200px'>" + count[j] + "</span><br>") ;
	}

}






