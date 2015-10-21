


var app = app || {};

app.main = (function(){

	var attachEvents = function(){
		//on click get the value of the input
		$("#button").on('click', getInput);	
		$("#myQuery-box").keypress(function(e){
			if(e.keyCode == 13){
				getInput();
			}
		});
		if($("#myDate-box").val() > 1){
			$("#p").replace("year", "years");
		}
	};

	var getInput = function(){
		getArticle($("#myQuery-box").val(), $("#myDate-box").val())
		console.log("got it");
	}

	var init = function(){
		attachEvents();

	};

	function getArticle(query, numYearsAgo){
		var d = new Date();
		if(d.getMonth() < 9){ 
			var tempMonth = (d.getMonth() + 1).toString();
			var month = "0" + tempMonth;
		}else{
			month = (d.getMonth() + 1).toString();
		}
		var currentDate = (d.getFullYear()).toString() + month + (d.getDate()).toString();
		var begin_date = (d.getFullYear() - numYearsAgo).toString() + month + (d.getDate()).toString();
		console.log(begin_date);
		var APIkey= 'a793efdd5b1c06a7d1059a104616be3b:17:71711436';
		//have to account for all the cases
		if(numYearsAgo != ""){
			var thisURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin-date=" + begin_date + "&end-date="+ currentDate + "&api-key=" + APIkey;
		}else{
			alert("Fill out a date!");
		}

		$.getJSON(thisURL, function(json){
			console.log('data received');
			console.log(json);
			getWords(json);
		});
	}

	var getWords = function(json){
		var numberOfArticles = json.response.docs.length;
		console.log(numberOfArticles);
		var wordAry = [];
		for(var i=0; i< numberOfArticles; i++){
			var headline = json.response.docs[i].headline.main;
			wordAry[i] = headline.split(" ");
		}
		console.log(wordAry);

		 countWords(wordAry);
	};

	var countWords = function(wordAry){
		var countsObj = {};
		for(var j=0; j<wordAry.length; j++){
			for(var k=0; k<wordAry[j].length; k++){
				var word = wordAry[j][k];
				if(!countsObj.hasOwnProperty(word)){
					countsObj[word] = 1;
				}else{
					countsObj[word] ++;
				}
			}
		}
		console.log(countsObj);
		// app.viz.drawStuff(countsObj);
		append(countsObj);
	};

	var append = function(countsObj){
		$('#canvas').empty();
		for(var key in countsObj){
			var thingToAppend;
			if(countsObj[key] > 1){
				thingToAppend = "<b><span style='font-size: 30'>" + key + "</span><b>";
			}else{
				thingToAppend = key;
			}
			$('#canvas').append(thingToAppend + " ");
		}
	}



		return { //returning is so that the other app can read it
			init: init
		};

})();

window.addEventListener('DOMContentLoaded', app.main.init);






