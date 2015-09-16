//problem: when you input a tag, it always responses with the most recent tagged photo...
//which sometimes could be spam...

//set up instagram api
var searchTag = "";
var clientID = "31d54f1878e64d68ba4ac6100d16fee8";
var AT = "22713776.31d54f1.0956f4579a32497e9055c2fd806ae750";

//initializing funtion, all interactive elements go here
var init = function(){

	console.log("initializing the app...enter search tag...");

	//click on the button
	$("#search-button").click(function(e){
		e.preventDefault();
		searchTag();
	});
	//press enter
	$("#search-box").keypress(function(e){
			if(e.keyCode == 13){
				searchTag();}
			});
};

//set up search tag
var searchTag = function(){

	tag = $("#search-box").val();
	//check if the user inputs anything 
	if(tag === null || tag === ""){
		alert("Please enter a search tag!");
		return;
	}
	getData();
};

//get data from api and display them
var getData = function(){

	console.log("get pics from instagram api and display them...");

	$(".view").empty();

	$.ajax({

		type: "GET",
		url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + AT,
		//this url below, however, for some reason, won't work...
		//url: "https://api.instagram.com/v1/media/" + tag + "?access_token=" + AT,
		dataType: "jsonp",
		success: function(pic){
			//display the most recent 20 tagged picture (instagram api limits 20 pics)
			for (var i=0; i<20; i++){
		$(".view").append("<a target='_blank' href='" + pic.data[i].link + "'><img src='" + pic.data[i].images.low_resolution.url + "'></img></a>");
	}
		}
	});
};

$(document).ready(function(){
	init();
});
