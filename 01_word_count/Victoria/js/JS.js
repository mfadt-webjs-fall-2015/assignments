var nowLine ;

function wordCount(Something){
	nowLine = Something;
	var Words_Counter = 0;
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
