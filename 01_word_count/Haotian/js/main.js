console.log('count number function');
var content = prompt("type something");

var countWords = function (content){
	console.log("how many word:" +content.split(" ").length);
};


countWords(content);

var str = content.split(" ");

var counter = 0;

var countNumbers = function(a){
	for (var i = 0; i<str.length; i++){
		if(a == str[i]){
			counter++;
		};
	};
};

for (var i=0; i < str.length; i++){
	countNumbers(str[i]);
	console.log(str[i] + " : " + counter);
	counter = 0;
};


