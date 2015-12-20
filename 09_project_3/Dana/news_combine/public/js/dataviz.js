

	var displayHeadlines = function(){
		console.log('displayHeadlines')
		for(var i=0; i<topicHeadlines.length; i++){
			var div = $("<div/>").addClass("headline").attr("id", i).html(topicHeadlines[i].headline);
			$("#headlines").append(div);
		}
		linkGrammar(num);
		
	}
	var fixHeadline = function(headline){
			var wordsToLeaveCapital = ["Israel", "Egypt", "Brazil", "Greece", "Sudanese", "Palestinian", "Sudan", "Russia" , "Tel Aviv", "Likud" , "ISIS", "Obama", "United Arab Emirates", "Argentina", "Tunisia", "Tunisian", "Paris", "Hollande", "Jerusalem", "France", "Muslim", "Islam", "Trump"];

			var wordArray = headline.split(" ");
			for(var i=0; i<wordArray.length; i++){
				var match = false;
				for(var b = 0; b< wordsToLeaveCapital.length; b++){
					if(wordArray[i].match(wordsToLeaveCapital[b])){
						console.log("match");
						 match = true;
					}
				}

				if(match != true){
					wordArray[i]= wordArray[i].toLowerCase();
				}
			}

			var cleanHeadline = wordArray.join(" ");
			if(cleanHeadline.indexOf(":") > -1){ 
				cleanHeadline = cleanHeadline.replace(":", " says");
			}
			if(cleanHeadline.indexOf("'") > -1){ 
				cleanHeadline = cleanHeadline.replace(/'/g, "");
			}

			return cleanHeadline;
	}

	var linkGrammar = function(num){
		console.log('get grammar function initiated');
		var count = 0;
		console.log('length of topicHeadlines ' + topicHeadlines.length);
		for (var i = 0; i < topicHeadlines.length; i++) {
				var headline = topicHeadlines[i].headline;
				var cleanHeadline = fixHeadline(topicHeadlines[i].headline);	//make everything undercase		
				console.log(cleanHeadline + " | " + headline);
				$.ajax({
					type: "POST",
					url:  '/linkGrammar', //the address. post request
				 	data:{
					 		headline: cleanHeadline,
					 		i: i
				 		},
				 	error: function(XMLHttpRequest, textStatus, errorThrown){
				 		count ++;
				 		if(count == topicHeadlines.length){
				 			console.log(topicHeadlines);
				 			console.log("done with linkGrammar");
				 		}
				 	},
				 	success: function(response){ 
				 		count ++;
				 		var index = response.i;
				 		topicHeadlines[index]['grammar'] = response.relations;
				 		console.log(topicHeadlines[index]);
				 		var stringVersion = JSON.stringify(topicHeadlines[index].grammar);
				 		topicHeadlines[index]['grammarString'] = stringVersion;
				 		console.log(JSON.stringify(topicHeadlines[index].grammar));

				 		if(count == topicHeadlines.length){
				 			console.log(topicHeadlines);
				 			console.log("done with linkGrammar");
							parseSentence2();
				 		}
				 	},

				});		
			}

	}

	function inArray(phrase){
		var inThere = false;
			for(var i=0; i<phrases.length; i++){
				if(phrases[i] == phrase){
					inThere = true;
				}
			}

		return inThere;
	}

	function inEachArray(phrase){
		var inThere = false;
			for(var i=0; i<phrasesEach.length; i++){
				if(phrasesEach[i] == phrase){
					inThere = true;
				}
			}

		return inThere;
	}

	function parseSentence2(){
		console.log("parseSentence started");
		
		for(var s=0; s<topicHeadlines.length; s++){
			phrasesEach = [];
			// var s = 5;
			var str = topicHeadlines[s].grammarString;
			console.log(str);
			/*------- parse that crazy string and take out all labels ---------- */
			var label = /"label":/g;
			var match, matches = [];
			var labels = [];
			while((match = label.exec(str))!=null){
				matches.push(match.index);
				var endPos = match.index + 9;
				//second quotation after "label":"
				var secondQuotation = str.indexOf('"', endPos);
				var space = secondQuotation - endPos;
				var word = str.substr(endPos, space);
				console.log(word);
				labels.push(word);
			}
			console.log(labels);
	
			/*------- now we have an array of all labels, but lets split them to seperate the labels---------- */
			console.log("splitting them up into arrays");
			//anything after defining labels = part of that label
			//i need to reset these every S loop
			var NP = 1;
			var PP = 1;
			var VP = 1;
			var PRT = 1;
			var ADVP = 1;
			var SBAR = 1;

			for(var i=0; i<labels.length; i++){
				//////if you see any of these strings: 
				if(labels[i] == "S"){
					labels.splice(i,1);
					console.log(labels);
				}

				if(labels[i] ==  "NP" || labels[i] ==  "VP" || labels[i] ==  "PP" || labels[i] ==  "PRT" || labels[i] ==   "ADVP" || labels[i] == "SBAR"){
					console.log(labels);
					if(labels[i] == "SBAR"){
						labels[i] = "PRT"
					}
					console.log(i + " " + labels[i]);
					var p = i; 
					if(prevLabel != null && p != prevLabel+1){
						/////make slices of the array with everything
						var slice = labels.slice(prevLabel, p);
						// console.log(slice);
						var phraseName = slice[0];

						////////check if in array of this sentence
						var isInEachArray = inEachArray(phraseName);
						console.log(isInEachArray + " " + p + " "+ phraseName + " is " +isInEachArray);
		
						if(isInEachArray == true){ //already logged this label, so increase count
							if(phraseName == "NP"){
								NP ++;
								slice[0] = slice[0] + NP;
							}
							if(phraseName == "PP"){
								PP ++;
								slice[0] = slice[0] + PP;
							}
							if(phraseName == "VP"){
								VP ++;
								slice[0] = slice[0] + VP;
							}
							if(phraseName == "PRT"){
								PRT ++;
								slice[0] = slice[0] + PRT;
							}
							if(phraseName == "ADVP"){
								ADVP ++;
								slice[0] = slice[0] + ADVP;
							}
							if(phraseName == "SBAR"){
								SBAR ++;
								slice[0] = slice[0] + SBAR;
							}
							phraseName = slice[0];
							phrasesEach.push(phraseName);
						}else{
							phrasesEach.push(phraseName);
						}

						//now check to see if its in the main phrases array
						var isInArray = inArray(phraseName);
						if(isInArray == false){ //new label
							phrases.push(phraseName);
							//create brackets for these divs:
							var bracket = $("<div>").addClass("bracket");
							//create arrows for these divs:
							var button  = $("<button/>").attr("id", phraseName + "-down_arrow").addClass("button").html("v");
							if(phraseName != null){
							//create div with this class
							var div = $("<div/>").attr("id",phraseName).addClass("phraseLabel").html(button);
							$("#relations").append(div);
							$("#" + phraseName).prepend(bracket);
							}
						
							
						}
						console.log(slice);
						//send the slice ot the display
						display2(slice, s);
					} //end of if statement

				var prevLabel = p;
			} //end of if for checking the label names
		 } //end of for loop for the array of words
		 console.log(phrases);
		} //end of S for loop
	} //end of parseSentence2
		

	display2 = function(slice, i){
		// console.log("displaying")
		//things i need:
		//a div for the whole sentence with a class of related headline and an ID of its i number
		//a div for each part of speech with an id of the part of speech and a class of the headline i number
		var phraseName = slice[0];	
		//take off the first pos and join it into a string
		var phrase = slice.slice(1,slice.length).join(" ");
		console.log(phrase);
		var phraseDiv = $("<div/>").addClass(phraseName + " phraseName" + " " + i).attr('id', phraseName + "-" + i).html(phrase);
		// phraseDiv.innerHTML = phrase;
		// console.log(phraseDiv.innerHTML);
		// var id="related-" + i;
		// $("#" + id).append(phraseDiv);
		$("#" + phraseName).prepend(phraseDiv);
		var zAmount = -i*1000;
		opacity = (70 - i*7)/100;
					//bright green, orangy yellow, lighter green, bright pink, light purple, grey, bright blue, salmon
		var color = ["#D8E388", "#7AC943", "#E3AC89", "#7370F2", "#B3B3B3", "#3FA9F5", "#FF7479" ]
		// console.log("zAmount is: " + zAmount);
		$("#" + phraseName + "-" + i).css({		
			"-webkit-transform": 'translateZ(' +zAmount + 'px)',
	    	"transform": 'translateZ(' + zAmount + 'px)',
	    	"opacity": opacity,
	    	"color": color[i]
		});

		//setting the container div width to the width of the first word
		if(zAmount == 0){
			console.log("zAmount is 0");
			var width = $("#" + phraseName + "-" + i).css("width");
			console.log(width);
			$("#" + phraseName).css({
				"width": width
			})
		}


		 
	}









