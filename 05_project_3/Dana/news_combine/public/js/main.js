/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var totalFeeds;
	var rawData = {};
	var headlineArray = [];
	var relatedHeadlineArray = [];
	var selected;
	var selectedHeadline;
	var synonymArray = [];
	var num = -1;

	var queryy; 
	//second visual display stuff
	var phrases = [];
	var phrasesEach = [];
	var opacity;
	var zAmount;
	var sources=[
	//american news this might be scewed depending on which feeds for each paper...
	 	{
			aljazeeraAmericaURL: "http://america.aljazeera.com/content/ajam/articles.rss",
			cnnURL: ["http://rss.cnn.com/rss/cnn_topstories.rss", "http://rss.cnn.com/rss/cnn_world.rss", "http://rss.cnn.com/rss/cnn_us.rss"],
			foxNews: "http://feeds.foxnews.com/foxnews/latest",
			huffPost: "http://www.huffingtonpost.com/feeds/news.xml",
			abcNews: ["http://feeds.abcnews.com/abcnews/topstories","http://feeds.abcnews.com/abcnews/internationalheadlines", "http://feeds.abcnews.com/abcnews/usheadlines", "http://feeds.abcnews.com/abcnews/politicsheadlines", "http://feeds.abcnews.com/abcnews/blotterheadlines", "http://feeds.abcnews.com/abcnews/thelawheadlines", "http://feeds.abcnews.com/abcnews/moneyheadlines", "http://feeds.abcnews.com/abcnews/technologyheadlines", "http://feeds.abcnews.com/abcnews/healthheadlines", "http://feeds.abcnews.com/abcnews/entertainmentheadlines", "http://feeds.abcnews.com/abcnews/travelheadlines", "http://feeds.abcnews.com/abcnews/sportsheadlines", "http://feeds.abcnews.com/abcnews/worldnewsheadlines", "http://feeds.abcnews.com/abcnews/2020headlines", "http://feeds.abcnews.com/abcnews/primetimeheadlines", "http://feeds.abcnews.com/abcnews/nightlineheadlines", "http://feeds.abcnews.com/abcnews/gmaheadlines", "http://feeds.abcnews.com/abcnews/thisweekheadlines"],
			nyTimes: ["http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",  "http://rss.nytimes.com/services/xml/rss/nyt/World.xml", "http://rss.nytimes.com/services/xml/rss/nyt/US.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Education.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", "http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml", "http://cityroom.blogs.nytimes.com/feed/", "http://fort-greene.thelocal.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Business.xml", "http://rss.nytimes.com/services/xml/rss/nyt/EnergyEnvironment.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/SmallBusiness.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Dealbook.xml", "http://rss.nytimes.com/services/xml/rss/nyt/MediaandAdvertising.xml", "http://rss.nytimes.com/services/xml/rss/nyt/YourMoney.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", "http://bits.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/PersonalTech.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/InternationalSports.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Baseball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/CollegeFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Golf.xml", "http://www.nytimes.com/services/xml/rss/nyt/Hockey.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProBasketball.xml", "http://www.nytimes.com/services/xml/rss/nyt/ProFootball.xml", "http://www.nytimes.com/services/xml/rss/nyt/Soccer.xml", "http://www.nytimes.com/services/xml/rss/nyt/Tennis.xml", "http://gambit.blogs.nytimes.com/feed/", "http://www.nytimes.com/services/xml/rss/nyt/Science.xml", "http://www.nytimes.com/services/xml/rss/nyt/Environment.xml", "http://www.nytimes.com/services/xml/rss/nyt/Space.xml", "http://www.nytimes.com/services/xml/rss/nyt/Health.xml", "http://www.nytimes.com/services/xml/rss/nyt/Research.xml", "http://www.nytimes.com/services/xml/rss/nyt/Nutrition.xml", "http://www.nytimes.com/services/xml/rss/nyt/HealthCarePolicy.xml", "http://www.nytimes.com/services/xml/rss/nyt/Views.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml", "http://www.nytimes.com/services/xml/rss/nyt/InternationalArts.xml", "http://rss.nytimes.com/services/xml/rss/nyt/ArtandDesign.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Books.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Dance.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Movies.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Music.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Television.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Theater.xml", "http://artsbeat.blogs.nytimes.com/feed/", "http://carpetbagger.blogs.nytimes.com/feed/","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml","http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml", "http://rss.nytimes.com/services/xml/rss/nyt/DiningandWine.xml", "http://rss.nytimes.com/services/xml/rss/nyt/HomeandGarden.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Weddings.xml", "http://rss.nytimes.com/services/xml/rss/nyt/tmagazine.xml", "http://parenting.blogs.nytimes.com/feed/", "http://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", "http://topics.nytimes.com/top/features/travel/columns/frugal_traveler/index.html?rss=1", "http://www.nytimes.com/services/xml/rss/nyt/JobMarket.xml", "http://rss.nytimes.com/services/xml/rss/nyt/RealEstate.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Commercial.xml", "http://rss.nytimes.com/services/xml/rss/nyt/Automobiles.xml"],	//just world feed
			globesURL: "http://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=1725",
			haaretzURL: "http://www.haaretz.com/cmlink/1.263335",
			ynetURL: "http://www.ynet.co.il/Integration/StoryRss3082.xml",
			khamaPress: "http://www.khaama.com/feed", //afghanistan
			wafa: "http:english.wafa.ps/rss.php", //palestinian
			reuters: 	["http://feeds.reuters.com/reuters/topNews", "http://feeds.reuters.com/Reuters/domesticNews", "http://feeds.reuters.com/Reuters/worldNews","http://feeds.reuters.com/reuters/MostRead"],
			usNewssWorldReport: "http://www.usnews.com/rss/news",
			bbc: ["http://feeds.bbci.co.uk/news/rss.xml", "http://feeds.bbci.co.uk/news/world/rss.xml", "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"],
			washingtonPost: ["http://feeds.washingtonpost.com/rss/rss_election-2012", "http://feeds.washingtonpost.com/rss/rss_powerpost"],
			independent: "http://www.independent.co.uk/news/world/rss", //world feed
			guardian :["http://www.theguardian.com/world", "http://www.theguardian.com/us"], //world and us
			vice: ["http://www.vice.com/rss", "http://www.vice.com/en_ca/rss"], //us, canada
			laTimes: "http://www.latimes.com/rss2.0.xml",
			cbsNews: "http://www.cbsnews.com/latest/rss/main", //top stories
			jPost: ["http://www.jpost.com/Rss/RssFeedsFrontPage.aspx", "http://www.jpost.com/Rss/RssFeedsHeadlines.aspx", 	'http://www.jpost.com/Rss/RssFeedsIsraelNews.aspx','http://www.jpost.com/Rss/RssFeedsArabIsraeliConflict.aspx', 	'http://www.jpost.com/Rss/RssFeedsMiddleEastNews.aspx' ], //front page, Home, BreakingNews, Arab-Israeli Conflict, Middle East
			atlantic: "http://feeds.feedburner.com/TheAtlantic?format=xml",
			gothamist: "http://gothamist.com/news/index.xml",
			i24: ["http://www.i24news.tv/en/news/international.xml", "http://www.i24news.tv/en/news/israel/politics.xml"],
			wsj: "http://www.wsj.com/xml/rss/3_7085.xml", //wall street journal
			bostonGlobe: ["http://feeds.boston.com/boston/topstories", "http://feeds.boston.com/boston/mostpopular"]
		}
	];

	var attachEvents = function(){
		console.log('attaching events.');
		$("#query-box").keypress(function(e){
			if(e.keyCode == 13){
				var query = $("#query-box").val();
				queryy = query;
				headlineArray = [];
				if(query !=""){
					getXML(sources[0],query);
					$("#main-search-page").animate({
						marginTop: '-1000px',
					}, 500)

						var titleDiv = $("<div/>").attr("id", "title2").html("Choose a topic that relates to " + query);
						$("#topics-page").prepend(titleDiv);
				}
				
			}
		});
		$("#search-button").click(function(){
			var query = $("#query-box").val();

			headlineArray = [];
			if(query !=""){
				getXML(sources[0],query);
				$("#main-search-page").animate({
					marginTop: '-1000px',
				}, 500)


						var titleDiv = $("<div/>").attr("id", "title2").html("Choose a topic to compare headlines");
						$("#topics-page").append(titleDiv);
			}
			
		});
		
		$("#topics-page").on({
			mouseenter: function(e){
				console.log("hover");
				var id = e.target.id;
				selected = id.substr(id.length -1,id.length);
				console.log(selected);
				
				
			},
			mouseleave: function(){

			}
			
		
		}, ".circle");

		$("#topics-page").on('click', ".circle" ,function(e){
			console.log("click");
			var id = e.target.id;
			selected = id.substr(id.length -1,id.length);
			console.log(selected);
			$('#topics-page').animate({marginTop: '-6000px'},1000, function(){
			$('body').css({
				"background-color": "#333333"
			})
			displayHeadlines(); ///for the vizzual part
		})
			$('.circles').tooltip({
				selector: '.circle',
				placement: 'top',
				animation: true
			});
		});

		///--------------- dataviz events ----------------////

		$("#headlines-visual").on('click', "button" ,function(e){
			//animate all the translate Zs to be +1000, except when the z amount is 0 go to the end
			//if z amount is -1000 then the translateZ = -7000
			num ++;
			var word = e.target.parentElement.id;

			console.log(word);
			var synonyms = relatedHeadlineArray[selected].commonHeadlines[selectedHeadline]["synonyms"];
			var chosen = synonyms[word][1];
			console.log(chosen);
			var chosenn = chosen.substring(chosen.indexOf('-')+1, chosen.length); 

			//now loop through the chosen array
			var chosenSynArray = synonyms[word][0][chosenn]["syn"];
			if(num > chosenSynArray.length){
				num = 0;
			}
			

			var current = chosenSynArray[num];
			$("#" + word + "-h1").html(current);

			//change the width of the div
			// var width = $("#" + word + "-h1Fake").css("width");
			$("#" + word + "-h1").css({
				"width": width,
				"color": "#E58088"
			})



			
		});

		$("#headlines-visual").on('click', ".options", function(e){
			var id = e.target.id;
			console.log(id);
			var wordNum = id.substring(0,id.indexOf('-')); 	
			console.log(wordNum);
			var word = ("word" + wordNum);
			var synonyms = relatedHeadlineArray[selected].commonHeadlines[selectedHeadline]["synonyms"]
			console.log(relatedHeadlineArray[selected].commonHeadlines[selectedHeadline]);
			console.log(synonyms);
			if(synonyms[word].length == 1){
				synonyms[word].push(id);
			}else{
				synonyms[word][1] = id;
			}
			
		});
			
		

		$("#headlines").on('click', function(e){

			var id = e.target.id;
			console.log(id);
			selectedHeadline = id;
			displaySelected(id);

		});


		
		
	}


	var getFeedCount = function(){
		var feedIndex = 0;
		for(var company in sources[0]){
			if(Array.isArray(sources[0][company])){
				for(var i = 0; i < sources[0][company].length; i++){
					feedIndex ++;
				}
			}else{
				feedIndex ++;
			}
		}
		console.log("Feed index: " + feedIndex);
		return feedIndex;
	}

	var getXML = function(sources,query){
		var index = 0;
		var length = Object.keys(sources).length
		console.log('Amount of news sources: ' + length);
		//iterate through all the keys of the selected object
		for(var newsSite in sources){ //this loops makes the whole program run three times for each sourcechoice
			//if the source choice is an array then getXML for each source in the array
			if($.isArray(sources[newsSite])){
				for(var i=0; i<sources[newsSite].length; i++){ 
					var URL = sources[newsSite][i];
					console.log('searching through: ' + URL);
					callApi(URL, function(){
						searchQuery(query);
					});
				}
			}else{ //there is only one rss feed for this source
				URL = sources[newsSite];
				console.log('searching through: ' + URL);
				callApi(URL, function(){
					searchQuery(query);
				});

			 }
			
			function callApi(newsSite, callback){
				$.ajax({
					type: "GET",
					url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(URL),
					dataType: "json",
					indexValue: newsSite, //the name of the source
					error: function(){
						index ++;
		            	alert('Unable to load feed, Incorrect path or invalid feed');
		            	if(index == totalFeeds){
		            		callback();
		            	}
		            	console.log(index);
		       		},
		       		
		        	success: function(xml){
		        		index ++;
		        		func(xml, this.indexValue);
		        		function func(data, site){
			            	data = xml.responseData.feed.entries;
			            	if(rawData.hasOwnProperty(site)) {
			            		for(var i=0; i<data.length; i++){
			            			rawData[site].push(data[i]); //push the data into rawData unless it already has it in there
			            		}
			            	}else{           	 
								rawData[site] = data; //add source name as a key for each value
			            	}
			            	console.log("The results for: " + site + " are: " + rawData);

		            	}//end of func 
		            	console.log(index);
		            	if(index == totalFeeds){
		            		callback();
		            	}
		        	} //end of success
				})
			}//end of function callApi
		} //end of for in loop
	
	} //end of getXML

	var searchQuery = function(query, callback){
		console.log("searchQuery function initiated");
		var headline;
		console.log(rawData);
		for(var feed in rawData){
			var values = rawData[feed]; //this is an array of objects
			for(var i=0; i<values.length; i++){ //loop throuch each object
				headline = values[i].title; //gets the title of each article in the object
				var date = values[i].publishedDate;
				var link = values[i].link;
				if(headline.indexOf(query) > -1){ //if the title has the query word in it
					//console.log(feed + headline);
					if(headlineArray.length > 0){ //if the array is greater than 0 first check to see if the headline is already in there
						var duplicate = checkDuplicates(headline);
						if(duplicate == false){
							headlineArray.push({'headline': headline, 'date': date, 'link': link, 'source': feed});
						}
					}else{
						headlineArray.push({'headline': headline, 'date': date, 'link': link, 'source': feed});
					}
				}
			}
				
		}
		//console.log("the headlines ind(headlineArray) with the query world are: " + headlineArray);
		console.log(headlineArray);	
		getKeywords(query);
		// linkGrammar();	
	} //end of searchQuery function

	var checkDuplicates = function(headline){
		var duplicate= false;
		
			for (var i = 0; i < headlineArray.length; i++) {
				// console.log("checking if: " + headline + " | " + headlineArray[i].headline );
				if(headlineArray[i].headline == headline){
					console.log(headline + " | duplicate");
					duplicate = true;
				}
				
			}
			
		return duplicate;
	}

	var getKeywords = function(query){
		console.log('getKeywords function initiated');
		var count = 0;
		for (var i = 0; i < headlineArray.length; i++) {	
		var headline = headlineArray[i].headline;	
			$.post('/getKeywords', //the address. post request
			 	{
			 		headline: headline,
			 		i: i
			 	},										// the data im sending
			 	function(response){ 
			 		count ++;
			 		//console.log(response.keyWords);
				 	var index = response.i;
				 	headlineArray[index]['keywords'] = response.keyWords;
			 		//attach the keywords to the headlineArray
			 		
			 		if(count == headlineArray.length){
			 			console.log(headlineArray);
			 			console.log("done getting keywords");
			 			// linkGrammar();
			 			findSimilarHeadlines(query);
			 		}
			 	}
			);
		}
		

	}


	var findSimilarHeadlines = function(query){
		console.log("findSimilarHeadlines function initiated");
		for(var i=0; i <headlineArray.length; i++){
			var article = headlineArray[i];
			var headline = article.headline;
			var keywords = article.keywords;

			var matchedHeadlines = [];
			matchedHeadlines.push(article);
			if(keywords != null){
				for(var j = 0; j< keywords.length; j++){

					var matchedKeyword = '';

					for (var k=0; k<headlineArray.length;k++){

						//don't check itself
						if( i !== k ){

							//find matches in keywords
							var articleK = headlineArray[k];
							var headlineK = headlineArray[k].headline;
							var keywordsK_array = headlineArray[k].keywords;

							if(keywords[j].text != query){
								var matchedIndex = _.findIndex(keywordsK_array, function(chr) {
								  	return chr.text == keywords[j].text;
								});
								if( matchedIndex != -1 ){


									// var topic = {
									// 	commonHeadlines: [article, articleK],
									// 	commonKeywords: keywordsK_array[matchedIndex].text
									// }
									// relatedHeadlineArray.push(topic) 
									//console.log("THIS MATCHED! >>>", keywordsK_array[matchedIndex].text, headline, headlineK)
									matchedKeyword = keywordsK_array[matchedIndex].text;
									matchedHeadlines.push(articleK);
									//logThis(keywordsK_array[matchedIndex].text, article, i, articleK, k);
									

								}
							}

						}

					}

				}
			}

			if(matchedHeadlines.length > 1 && matchedKeyword!= ''){
				var topic = {
					commonHeadlines: matchedHeadlines,
					commonKeywords: matchedKeyword
				}
				var matchedIndex = _.findIndex(relatedHeadlineArray, function(chr) {
					// console.log(chr, matchedKeyword)
				  	return chr.commonKeywords == matchedKeyword;
				});
				if( matchedIndex == -1 ){
					relatedHeadlineArray.push(topic) 
				}
			}

			
		} //end of first loop
		console.log(relatedHeadlineArray);
		displayTopics();
	}

	

	var displayTopics = function(){
		for(var i=0; i<relatedHeadlineArray.length; i++){
			var numArticles = relatedHeadlineArray[i].commonHeadlines.length;

			var div = $("<div/>").addClass("circle").attr("id", "topic-" + i).attr('data-toggle',"tooltip").attr("title", numArticles + " articles").html(relatedHeadlineArray[i].commonKeywords);
			var radius = relatedHeadlineArray[i].commonHeadlines.length * 40;
			$("#circles").append(div);
			$("#topic-"+i).css({
				"width":radius + "px",
				"height": radius + "px",
				"line-height": radius + "px"
			})
		}
	}

	

	/////-------------------- data vis stuff -------------------------------///
	
	var displayHeadlines = function(){
		console.log('displayHeadlines')
		var topicHeadlines = relatedHeadlineArray[selected].commonHeadlines;
		for(var i=0; i<topicHeadlines.length; i++){
			var div = $("<div/>").addClass("headline").attr("id", i).html(topicHeadlines[i].headline);
			$("#headlines").append(div);
		}

		
		
	}

	var displaySelected = function(id){
		console.log("displaySelected");
		$("#title3").html("Hover over word to select phrase type. Scroll to explore synonyms");
		var topicHeadlines = relatedHeadlineArray[selected].commonHeadlines;
		var headline = topicHeadlines[id].headline;
		var words = headline.split(" ");
		$("#headlines-visual").empty();
		//create new div for each word and append to headlines visual
		for(var i=0; i<words.length; i++){
			console.log(words);
			var bracket = $("<div>").addClass("bracket").attr("id","word" + i + "-bracket" );
			var h1 = $("<h1/>").attr("id","word" + i + "-h1").addClass("text").html(words[i]);
			// var h1Fake = $("<h1/>").addClass("fake").attr("id","word" + i + "-h1Fake").html(words[i]);
			var button  = $("<button/>").attr("id", "word" + i + "-down_arrow").addClass("button").html("v");
			var div = $("<div/>").attr("id","word" + i).addClass("word").html(h1);
			$('#headlines-visual').append(div);
			// $('#word' + i).append(h1Fake);
			$('#word' + i).append(bracket);
			$('#word' + i).append(button);
		}

		getSynonyms(id);

	}

	var getSynonyms = function(id){
		var topicHeadlines = relatedHeadlineArray[selected].commonHeadlines;
		var headline = topicHeadlines[id].headline;
		var selectedArticle = relatedHeadlineArray[selected].commonHeadlines[id];
		var words = headline.split(" ");
		var synonyms = selectedArticle["synonyms"] = {};
		//create new div for each word and append to headlines visual
		for(var i=0; i<words.length; i++){
			var thisURL = "http://words.bighugelabs.com/api/2/9cb235b9e6a8cd59246fb65b62f9877c/" + words[i] + "/json"

			$.ajax({
				url :  thisURL ,
				dataType : "json", 
				indexValue: i,
				success: function (response) {
					// var word = xml.getElementsByTagName("user");
					console.log(response);
					var word  = "word" + this.indexValue
					var array = [];
					array.push(response);
					console.log(array);
					synonyms[word] = array;

					var options = Object.keys(response);
					console.log(options);
					var toolDiv = $("<div/>").addClass("tooltip").attr("id", this.indexValue + "-toolTip");
					$("#word" + this.indexValue + "-h1").append(toolDiv);

					for(var i=0; i<options.length; i++){
						var div = $("<div/>").addClass("options").attr("id", this.indexValue + "-" + options[i] ).html(options[i]);
						$("#" + this.indexValue + "-toolTip").append(div);
					}


					
				},
				error: function(){
					$("#word" + this.indexValue + "-down_arrow").hide();
					$("#word" + this.indexValue + "-bracket").hide();
				}
			});
		}

	}
	
	

	var init = function(){
		console.log('Initializing app.');
		totalFeeds = getFeedCount();
		attachEvents();

	};



	return {
		init: init,

		//callApi: callApi
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);