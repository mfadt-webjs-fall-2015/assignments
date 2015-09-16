var fontFamily = ["'Oswald', sans-serif","'Arvo', serif","'Quicksand',sans-serif","'Maven Pro',sans-serif","'Play',sans-serif","'Candal', sans-serif","'Montserrat', sans-serif"];
var font_size = 120;
var Color = ["red","green","blue","yellow","white"];
var NowWord = "hi";
var NowWordColor = "black";
var NowBG = "white";

var currentStage = 0;
var score = 0;

var red = 114;
var green = 103;
var blue = 98;
var yellow = 121;
var white = 119;

var time = 10;
var StartTime;
var leftTime = time;
var countdown;
var animateEnding;
var oldScore = localStorage['record'];
if(!oldScore)oldScore=0;




$(function(){
	$("#timer").text("timer: "+ leftTime);
	$("#oldScore").text("Highest score: "+ oldScore);
	countdown = setInterval(timeUpdate,1000);
	
	//console.log(countdown);
});

$(document).keypress(
		function (key) {
			//console.log(key["keyCode"]);
			if(currentStage==0){
				StartTime = new Date();
				//console.log(StartTime.getTime());
				currentStage = 1;
			}

			if(currentStage==1){
				start(key["keyCode"]);
			}
		});

function timeUpdate(){
	if(currentStage==1){
		var CurrentTime = new Date();
		var betweenTime = CurrentTime.getTime()-StartTime.getTime();
		leftTime = Math.floor((time*1000 - betweenTime)/1000);
		if(leftTime<0){
			currentStage = 2;
			end();
		}
	}
	$("#timer").text("timer: "+ leftTime);
}


function start(key){
	correct(key);
	randomQuestion();
}

function end(){
	if(oldScore<score)localStorage['record']=score;
	$(".remove").remove();
	$("#text").css("top","35%");
	$("#text").css("font-family","'Montserrat', sans-serif");
	$("#text").text(score+"!");
	animateEnding = setInterval(bigSmall,500);
}

function bigSmall(){
	if(font_size<220){
		font_size = 240;
	}else{
		font_size = 200;
	}
	NowBG = randomBack();
	$("body").css("background-color",NowBG);
	do{
		NowWordColor = randomBack();
	}while(NowWordColor==NowBG)
	$("#text").css("color",NowWordColor);
	$("#text").animate({fontSize: font_size+"px"});
}

function correct(keyCode){
	switch(keyCode){
		case red:
			if(NowWordColor=="red"){
				score +=1;
			}
		break;
		case green:
			if(NowWordColor=="green"){
				score +=1;
			}
		break;
		case blue:
			if(NowWordColor=="blue"){
				score +=1;
			}
		break;
		case yellow:
			if(NowWordColor=="yellow"){
				score +=1;
			}
		break;
		case white:
			if(NowWordColor=="white"){
				score +=1;
			}
		break;
		default:
		break;
	}
	$("#score").text("score: "+score);
}

function randomQuestion(){
	NowBG = randomBack();
	$("body").css("background-color",NowBG);
	do{
		NowWordColor = randomBack();
	}while(NowWordColor==NowBG)
	$("#text").css("color",NowWordColor);
	$("#text").css("margin-left","-160px")
	NowWord = randomBack();
	var newFont = randomFont();
	console.log(newFont);
	$("#text").css("font-family",newFont);
	$("#text").text(NowWord);
	//console.log(NowWord,NowWordColor);
}

function randomFont(){
	var Num = Math.floor(Math.random()*1000)%fontFamily.length;
	return fontFamily[Num]
}

function randomBack(){
	var Num = Math.floor(Math.random()*1000)%Color.length;
	return Color[Num];
}

// function tryChangeCSS(keyCode){
// 	switch(keyCode){
// 		case 114:
// 		$("body").css("background-color",Color[0]);
// 		break;
// 		case 103:
// 		$("body").css("background-color",Color[1]);
// 		break;
// 		case 98:
// 		$("body").css("background-color",Color[2]);
// 		break;
// 		case 121:
// 		$("body").css("background-color",Color[3]);
// 		break;
// 		default:
// 		break;
// 	}
// }
