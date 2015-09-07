var nowLine ;


function wordCount(Something){
	nowLine = Something;
	var Words_Counter = 0;
	for(var token in Something){
		if(Something[token] != " "){
			Words_Counter ++;
		};
	};
	return Words_Counter;
};

function summery(){
	//console.log(nowLine);
	var nowWords = "";
	var dic = {};
	for(var token in nowLine){
		
		if(nowLine[token]== " "){
			if(!(nowWords in dic)){
				dic[nowWords] = 1;
			}else{
				dic[nowWords]++;
				
			};
			nowWords = "";
		}else{
			nowWords += [nowLine[token]];
		};
	};
	return dic;
};
