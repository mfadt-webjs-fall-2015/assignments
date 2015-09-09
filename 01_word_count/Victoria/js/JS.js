
var nowLine ;


function submit(){
	//console.log("Click");
	var CountWhat = document.getElementById('textHere').value;
	//console.log(CountWhat);
	var resulrHere_Count = document.getElementById('resulrHere_Count');
	var resulrHere_Summery = document.getElementById('resulrHere_Summery');
	resulrHere_Count.innerHTML = wordCount(CountWhat);
	var summeryHere = summery();
	for(var item in summeryHere){
		resulrHere_Summery.innerHTML += item +": "+ summeryHere[item]+"<br>";
	}
	//resulrHere_Summery.innerHTML = for( var item in summery());
}

function wordCount(Something){
	nowLine = Something;
	var Words_Counter = 1;
	for(var token in Something){
		if(Something[token] == " "){
			Words_Counter ++;
		};
	};
	return Words_Counter;
};

function summery(){
	//console.log(nowLine);
	function nowWordsInDic(nowWords){
		if(!(nowWords in dic)){
				dic[nowWords] = 1;
			}else{
				dic[nowWords]++;
			};
	};
	var nowWords = "";
	var dic = {};
	for(var token in nowLine){
		if(nowLine[token]== " "){
			nowWordsInDic(nowWords);
			nowWords = "";
		}else{
			nowWords += [nowLine[token]];
		};
	};

	nowWordsInDic(nowWords);
			nowWords = "";
	return dic;
};
