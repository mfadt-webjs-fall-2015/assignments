var app = app || {};
// No, wait! That's a bit different than what we've done before!
// What we're doing is checking if some other JS file
// has already created an app object.
// If so, we'll work with it (var app = app) and add properties to it.
// If not, let's create an empty one (var app = {});

app.main = (function(){
$(document).ready(function(){
 $("#taskList").hide();
$("#myBt").click(function(){
  $("#taskList").show(1000);
  });
 $("#taskList2").hide();
$("#myBt2").click(function(){
  $("#taskList2").show(1000);
  });







/////////////////////////////////////////////////////////////
//                        Incode                           //
/////////////////////////////////////////////////////////////

     // Define the string
	// $("#myBt").click(function(e){
	// 	// var input = function(){};
	// 	var string = $('#inputForm').val();
	// 	// console.log(string);
	// 	// console.log('1');
	// 	// Encode the String
	// 	var encodedString = btoa(string);
	// 	console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
 //     });
    
//place to save tasks
var taskArray = [];


//update task list
var updateTasks = function(){
	
	//define the last task list dv
	var taskListHolding = document.getElementById('taskList');
	
	//empty the task list
	taskListHolding.innerHTML = '';
	
	//determine task list length
	var len = taskArray.length;
	var i;
	
	//log each task
	for(i = 0; i < len; i++){
		console.log('task ' + i + ': ' + taskArray[i]);
		
		var newTask = document.createElement('div');
		
		//define the div's id as the index and it's classs as task
		newTask.id = i;
		newTask.className = 'task';
		
		//create the task paragraph to put in the notes div
		// var newDiv = document.createElement('div');
		var task = document.createElement('p');
		
		//assign the task to the task div
		task.innerText = taskArray[i];
		
		//create a delte button to put in the newTask div
		var deleteButton = document.createElement('button');
		
		//set the delete button id to deleteButton
		deleteButton.id = 'deleteButton';
		
		//add X as value
		deleteButton.innerText = 'X';
		
		//add the event listener
		deleteButton.addEventListener('click', function(e){
			e.preventDefault();
			deleteTask(e);	
		});
		
		// task.appendChild(newDiv);
		//append the task to the taskDiv
		newTask.appendChild(task);
	
		//append the delete button to the newTask div
		newTask.appendChild(deleteButton);
			
		//append the taskDiv to the taskListHolding Div
		taskListHolding.appendChild(newTask);
		
		
	};
	
};


//save task
var saveTask = function(){
	
	//define the input form + the value
	var taskInput = document.getElementById('inputForm');
	var newTask = taskInput.value;


		var encodedString = btoa(newTask);
		
	
	//add the value to the taskArray
	taskArray.push(encodedString);

	//send task

    //Public_Key:2JxAO5vb7biEWpAJ639w
    //Private_Key :GPydE7BAXAs8zm1bMvYq
    //var myDataString = encodedString;
    $.get( "http://data.sparkfun.com/input/2JxAO5vb7biEWpAJ639w?private_key=GPydE7BAXAs8zm1bMvYq&ciphers=" + encodedString);
	
	//update your task view
	updateTasks();
	
	//clear the input
	taskInput.value = '';
	
	//log the task array
	console.log(taskArray);
	
};




//delete task
var deleteTask = function(e){
	
	var taskNumber = e.target.parentElement.id;
	
	//go to the taskNumber positiong of taskArray and remove one object
	taskArray.splice(taskNumber, 1);
	
	//update tasks to show new array
	updateTasks();
		
};


//init
var init = function(){
	
	console.log("Hi! I'm Ready!");
	
	//define "add" button
	var addButton = document.getElementById("myBt");
	
	//add event listener for click
	addButton.addEventListener('click', function(e){
		
		e.preventDefault();
		saveTask();
		
		
	});
	
	
};


  //   $("#myBt2").click(function(e){
  //       var string = $('#inputForm2').val();
		// // Decode the String
		// var decodedString = atob(string);
		// console.log(decodedString); // Outputs: "Hello World!"
  //   });
document.onkeydown = function() {
	document.getElementById('keyPress').play();}

/////////////////////////////////////////////////////////////
//                        Decode                           //
/////////////////////////////////////////////////////////////
var taskArray2 = [];
var ciphers;
//////////////////////////Get data///////////////////////////
            
            //Public_Key: 0lxyEV808msY8r2bVM14
            //Private Key: D6pyroKBKEhEonK16aN9

$(document).ready(function() {

				setInterval(updateData, 2000);
			});


			function updateData(){
				$("data").empty();
				var attention;
		        $.get( "http://data.sparkfun.com/output/0lxyEV808msY8r2bVM14/latest.csv", function( data ) {
					var items = [];
					console.log(data);
					items = data.split(",");
					console.log(items.length)
					ciphers = items[1].split("\n");
					ciphers = ciphers[1];
					console.log(ciphers);
					//saveTask2(ciphers);
					//$("#inputForm2").html(ciphers);
					//$("p").replaceWith(".ciphers");
					$(".cipher").html( "Incoming Ciphers: " + ciphers)
					//attention = items[3];
					//console.log(meditation);
					 //$(".thinking").html( "Thinking = " + meditation)
					 //$(".attention").html( "Attention = " + attention)
					// $(".total-count").html( "Total number of datapoints: " + data.length);
					
					// $.each( data, function( i, thisDataObj ) {
					// 	items.push( "<li id='" + i + "'>" + thisDataObj.data + "</li>" );
					// });

					// $( "<ul/>", {
					// 	"class": "my-data",
					// 	html: items.join( "" )
					// }).appendTo( "body" );

		        	//var colorString = "rgb(0,"+attention+",0)";
		        	//$("body").css("background-color", colorString)
		        	//$("body").style.backgroudColor = "rgb(attention,0,0)";
				});
			}


//update task list
var updateTasks2 = function(){
	
	//define the last task list dv
	var taskListHolding2 = document.getElementById('taskList2');
	
	//empty the task list
	taskListHolding2.innerHTML = '';
	
	//determine task list length
	var len2 = taskArray2.length;
	var j;
	
	//log each task
	for(j = 0; j < len2; j++){
		console.log('task2 ' + j + ': ' + taskArray2[j]);
		
		var newTask2 = document.createElement('div');
		
		//define the div's id as the index and it's classs as task
		newTask2.id = j;
		newTask2.className = 'task2';

		
		//create the task paragraph to put in the notes div
		var task2 = document.createElement('p');
		
		//assign the task to the task div
		task2.innerText = taskArray2[j];
		
		//create a delte button to put in the newTask div
		var deleteButton2 = document.createElement('button');
		
		//set the delete button id to deleteButton
		deleteButton2.id = 'deleteButton2';
		
		//add X as value
		deleteButton2.innerText = 'X';
		
		//add the event listener
		deleteButton2.addEventListener('click', function(e){
			e.preventDefault();
			deleteTask2(e);	
		});
		
		//append the task to the taskDiv
		newTask2.appendChild(task2);
	
		//append the delete button to the newTask div
		newTask2.appendChild(deleteButton2);
			
		//append the taskDiv to the taskListHolding Div
		taskListHolding2.appendChild(newTask2);
		
		
	};
	
};

//save task
var saveTask2 = function(){
	
	//define the input form + the value
	//var taskInput2 = document.getElementById('inputForm2');
	//var newTask2 = taskInput2.value;


		var decodedString = atob(ciphers);
		
	
	//add the value to the taskArray
	taskArray2.push(decodedString);
	
	//update your task view
	updateTasks2();
	
	//clear the input
	//taskInput2.value = '';
	
	//log the task array
	//console.log(taskArray2);
	
};


//delete task
var deleteTask2 = function(e){
	
	var taskNumber2 = e.target.parentElement.id;
	
	//go to the taskNumber positiong of taskArray and remove one object
	taskArray2.splice(taskNumber2, 1);
	
	//update tasks to show new array
	updateTasks2();
		
};


//init
var init2 = function(){
	
	console.log("Hi! I'm Ready!2");
	
	//define "add" button
	var addButton2 = document.getElementById("myBt2");
	
	//add event listener for click
	addButton2.addEventListener('click', function(e){
		
		e.preventDefault();
		saveTask2();
		
		
	});
	
	
};
init();
init2();
 });
})();


window.addEventListener('DOMContentLoaded', app.main);