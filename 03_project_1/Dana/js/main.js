

var app = app || {};

app.main = (function(){
	var attachEvents = function(){
		console.log('attaching events.');
		//change the value options in the input on keypress
		$('#select').keypress(function(key) {

		    if(key.charCode != 38 || key.charCode != 39){
		        return false; //dont let the user input anything in the input
		    }
		});
		var change = -1;
		var valueOptions = ['United States', 'Israel', 'Both']
		$("#up_arrow").click(function(){
				if(change > 2){ //go back to the first pos in the array once you reach the end
		    		change = 0;
				}
		    	change ++;
		    	$('#select').val(valueOptions[change]);    	
		});		
		$("#down_arrow").click(function(){
		    	change --;
		    	if(change < 0){
		    		change = 2;
				}
		    	$('#select').val(valueOptions[change]);
		});	
		$('#enter').click(function(){
			var wordQuery = $('#myQuery-box').val();
			getXML(change, wordQuery);
		});

		
	}
	var getXML = function(choice, _wordQuery){

		var sourceChoices = [ 		
		//american news this might be scewed depending on which feeds for each paper...
		 	{
				aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
				cnnURL: "http://rss.cnn.com/rss/cnn_topstories.rss",
				foxNews: "http://feeds.foxnews.com/foxnews/latest"
			},
		//israeli news
			{
				globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
				haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
				ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml"
			},
		//both.must be a better way of doing this
			{
				globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
				haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
				ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml",
				aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
				cnnURL: "http://rss.cnn.com/rss/cnn_topstories.rss",
				foxNews: "http://feeds.foxnews.com/foxnews/latest"

			}
		]
		
		var countryChoice = sourceChoices[choice];
		//iterate through all the keys of the selected object
		for(var newsSite in countryChoice){ //this loops makes the whole program run three times for each sourcechoice
			URL = countryChoice[newsSite];
			console.log('searching through: ' + URL);
			$.ajax({
				type: "GET",
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(URL),
				dataType: "json",
				error: function(){
	            	alert('Unable to load feed, Incorrect path or invalid feed');
	       		},
	        	success: function(xml){
	            	values = xml.responseData.feed.entries;
	            	console.log(values);
	            	parseData(values, _wordQuery);
	        	}
			});
		}
	};
	//get all the headlines and put them into an object, check for duplicates
	var parseData = function(values, wordQuery){
		var sourceHeadlines = [];
		//loop through every object in the response for that source
			for(var key in values){
				//loop through every key in the object(each object is an article)
				//defnie title and contentSnippet
				for(var key2 in values[key]){
					if(key2 == 'contentSnippet'){
						if(values[key][key2] != ""){
							var contentSnippet = (values[key][key2]).toString();
						}
					}
					if(key2 == 'title'){
						if(values[key][key2] != ""){
							var title = (values[key][key2]).toString();
						}
					}
					 if(key2 == 'publishedDate'){
					 	var date = values[key][key2];
					 }
				
					//take the longer one and set it equal to headline
					// if(contentSnippet.length > title.length){
					// 	var headline = contentSnippet;
					// }else{
					// 	headline = title;
					// }

				}
					var headline = title;
					sourceHeadlines.push(headline);
				//insert all the headlines in an array
				

			} 
			//console.log('sourceHeadlines: '+ sourceHeadlines);
			searchWord(sourceHeadlines, wordQuery);
			//getWords(sourceHeadlines);
	};

	var searchWord = function(sourceHeadlines, wordQuery){
		for(var i=0; i<sourceHeadlines.length; i++){
			if(sourceHeadlines[i].indexOf(wordQuery) != -1){ //check to see if query is in headline
				var sourceHeadlinesQueryWords = sourceHeadlines[i].split(" ");
				countWords(sourceHeadlinesQueryWords);			
			}
		}
		console.log(sourceHeadlinesQueryWords);
	};
	

	var countWords = function(sourceHeadlinesQueryWords){
		var sourceWordCount = {};
		var wordsDontWant = "i'm, to, in, I, me, he, she, herself, you, it, that, they, each, few, many, who, whoever, whose, someone, everybody, the, and, but";
		for(var i=0; i<sourceHeadlinesQueryWords.length; i++){
				var word = sourceHeadlinesQueryWords[i];
				//if the word is not present in wordsDontWant string
				if(wordsDontWant.indexOf(word) == -1){
					if(!sourceWordCount.hasOwnProperty(word)){
						sourceWordCount[word] = 1;
					}else{
						sourceWordCount[word] ++;
					}
				}
			}
		
		console.log(sourceWordCount);
		
	};

	//which words appear most in all the papers?

	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};


		return { //returning is so that the other app can read it
			init: init
		};

})();

window.addEventListener('DOMContentLoaded', app.main.init);






