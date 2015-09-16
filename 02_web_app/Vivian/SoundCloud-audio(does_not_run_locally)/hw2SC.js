//HW for javascript using soundcloud api
//take user's input (user name), and output results of user's playlist
//Problems: the input must not contain spaces and special charaters, and for users who have special characters in their names, this might read 404 error..


//initialize soundcloud by set up client id
SC.initialize({
    client_id: "2a07199dfa5c5a410fd683cbb2453427"
  });

var init = function(){

	console.log("let's start! Type in user name in the input box, no space and special characters...");

	$("#search-button").click(function(e){
		e.preventDefault();
		searchUser();
	});

	$("#search-box").keypress(function(e){
		if(e.keyCode == 13){
				searchUser();}
			});
};

//allow users to search their fav users on sound cloud
var searchUser = function(){

	$("#player").empty();
	//type in user name, no space...
	var user = $("#search-box").val();
	//embed sound player, sound cloud default
	SC.oEmbed("http://soundcloud.com/" + user, {auto_play:true}, document.getElementById("player"));
};

$(document).ready(function(){
	init();
});