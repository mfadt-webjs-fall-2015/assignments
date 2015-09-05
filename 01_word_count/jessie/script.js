function wordcount(_textinput) {

	var textinput = _textinput;
	var punctuationless = textinput.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	var nopunc = punctuationless.replace(/\s{2,}/g," ");
	var lowercase = nopunc.toLowerCase();
	var textarray = lowercase.split(" ");

	var numwords = textarray.length;
	console.log("number of words: " + numwords);

	var sorted = textarray.sort(); 

	var counted = [],
    wordcount = 1;

    for (var i=0; i<sorted.length; i++) {

        var currentword = sorted[i];

        if(sorted[i+1] === currentword) {
            wordcount++;
        } else {
        	counted.push([wordcount, sorted[i]]);
        	wordcount = 1;
        }
    }

    sorted = counted.sort();
    var reversed = counted.reverse();

    for (var i=0; i<reversed.length; i++) {
    	console.log(reversed[i][0] + " : " + reversed[i][1]);
    }

    display(reversed, textinput);

};

function display(_array, _textinput){

	var array = _array;

	var header = document.getElementById("header");
	header.innerText = "";

	var container = document.getElementById("container");

	container.innerHTML = "";

	var inputcontainer = document.getElementById("input");

	inputcontainer.innerHTML = "";

	var input = document.createElement("p");
	input.innerText = _textinput;
	inputcontainer.appendChild(input);

	for (var i=0; i<array.length; i++) {

		var worddiv = document.createElement("div");
		worddiv.className = "wordcontainer";

		var wordtext = document.createElement("p");
		wordtext.className = "word";
		wordtext.innerText = array[i][1];

		var countdiv = document.createElement("div");
		countdiv.className = "countcontainer";

		var count = document.createElement("p");
		count.className = "count";
		count.innerText = array[i][0];
		count.setAttribute("width", array[i][0]*100 + "px");

		countdiv.appendChild(count);
		worddiv.appendChild(wordtext);
		worddiv.appendChild(countdiv);
		container.appendChild(worddiv);
	};
};


