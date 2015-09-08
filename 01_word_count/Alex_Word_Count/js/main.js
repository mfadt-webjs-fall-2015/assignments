var button = document.getElementById('countWordsBtn');

button.onclick = function(){

	var str = document.getElementById('text').value;
	
	var res = str.split(" ");

	var counts = [];

	for(var i = 0; i< res.length; i++) {
    	var num = res[i];
    	counts[num] = counts[num] ? counts[num]+1 : 1;
	}


//the loop below sends each number in the array to its own div- but it only outputs the number, not the word it is counting
for (var x in counts) {
    var newElement = document.createElement('div');
    newElement.id = counts[x]; newElement.className = "counts";
    newElement.innerHTML = counts[x];
    document.body.appendChild(newElement);
}

 	console.log(counts);

}

