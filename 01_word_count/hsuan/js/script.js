/* Hsuan */

var words = (function(){

	//trim 把多餘的東西剪掉，sort 是排序
	var sWords = document.body.innerText.toLowerCase().trim().split(' ').sort();
	var iWordsCount = sWords.length; 


	//計算字數出現幾次
	var counts = {}; 
	for (var i=0; i<iWordsCount; i++) {
		var sWord = sWords[i];
			counts[sWord] = counts[sWord] || 0;
			counts[sWord]++;	
	}

	//改格式
	var arr = []; 
	for (sWord in counts) {
		arr.push({
			text: sWord,
			frequency: counts[sWord]
		});
	}

	//排序
	return arr.sort(
		function(a,b){

			if(a.frequency > b.frequency) {
				return -1;
			}
			else if(a.frequency < b.frequency) {
				return 1;
			}
			return 0;
		}
	);

}());

(function(){
	var iWordsCount = words.length;
	for (var i=0; i<iWordsCount; i++) {
		var word = words[i];
		console.log(word.frequency, word.text);
	}
}());






