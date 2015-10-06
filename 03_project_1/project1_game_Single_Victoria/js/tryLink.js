/* Your code starts here */

var app = app || {};

app.main = (function() {

	// Declaring our app variables
	var nameOfTheClass;
	var GameClass;
	var CreateOBJ;
	var readOBJ;	// Parse Fetch Object

	function initParse(){
		Parse.initialize("yWnoF1GLoAu1NMfFgYxzaTdOxc7LfwhwYdjkByAz", "NLHgRscamNJTAgfj8CdHXdtfpEP2VFzamHj7CEfv");	
		nameOfTheClass = 'LavaGame';
		//for create
		GameClass = Parse.Object.extend(nameOfTheClass);
		CreateOBJ = new GameClass();
		//for read
		readOBJ = new Parse.Query(nameOfTheClass);
	}

	//create obj
	var saveOBJ = function(ParseClass,obj){
		ParseClass.save(obj,{
			success: function(res){

			},
			error: function(res,err){
				console.log("No "+err);
			}
		})
	}
	
	//read obj
	var FetchOBJ = function(name,value,paresFetch,callback){
		paresFetch.equalTo(name,value).find(
			success: function(obj){
				callback(obj[0]);
			},
			error: function(err){

			}
			);
	}

	//update
	var update = function(obj,name,value){
		obj.set(name,value);
		obj.save();
	}

	//delete
	var deleteData = function(obj){
		obj.destroy();
	}

	var init = function(){
		initParse();
	}

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);