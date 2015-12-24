/* Your code starts here */

var app = app || {};

var g_top;
var g_left;

var r = Math.round(Math.random() * 255) ;
        var g = Math.round(Math.random() * 255) ;
        var b = Math.round(Math.random() * 255) ;

app.main = (function() {
	console.log('Your code starts here!');

	var socket;

	// Initializing socket and adding listener functions
	var socketSetup = function(callback){
		
		// Connect
	    socket = io.connect();

		// Listeners
		socket.on('welcome', function(data){
			console.log('SOCKET: welcome');
			console.log(data.msg);
			// console.log(data.users);
			// We want to render users that were here before me.
			// First, let's see if there were ANY
			if(Object.keys(data.users).length > 0){
				for(var id in data.users){
					addBall({
						id: id,
				        color: data.users[id]['color'],
				        top: data.users[id]['top'],
				        left: data.users[id]['left'],
				        rotate: data.users[id]['rotate']
				        //width: data.users[id]['width'],
				        //height: data.users[id]['height']
				        					
					});
				}				
			}
		});

		socket.on('add-ball', function(data){
			console.log('SOCKET: add-ball');
			console.log(data);
			addBall(data);
		});
		
		socket.on('remove-ball', function(data){
			console.log('SOCKET: remove-ball');
			if(ballExists(data.id)){
				removeBall(data);
			}
		});

		// Listen again, this time to render
		socket.on('render', function(data){
			console.log('SOCKET: render');
			// console.log(data);
			// If a ball with this ID hasn't been rendered yet, let's add it
			if(!ballExists(data.id)){
				addBall(data);
			}
					//g_top = data.top;
		            //g_left = data.left;
			moveBall(data);
			//readColor(data);
		});			

		// Call attachEvents
		callback();
	};

	var addBall = function(data){
		console.log('Appending a new ball: ' + data.id);
		console.log('a:'+data.width, 'b:'+data.height);
		console.log(data);
		

		var ball = $('<div class="ball" id="' + data.id + '"></div>')
				 	.css({
				 		//'background-color': data.color,
				 		'top': data.top,
				 		'left': data.left,
				 		//'width': data.width,
				 		//'height': data.height,
				 		'transform':'rotate('+data.rotate+'deg)',
				 		'border-top': ' 100px solid ' + data.color
				 		//'transform':'scale(' +data.width+','+data.height+')'
				 		
				 	});
		$('body').append(ball);

		/////////////////////
  function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.now();
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
 // var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    //'days': days,
    //'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  //var daysSpan = clock.querySelector('.days');
  //var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    //daysSpan.innerHTML = t.days;
    //hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.now() + 5 * 60 * 1000);
initializeClock('clockdiv', deadline);
	};


	var removeBall = function(data){
		console.log('Called removeBall for ' + data);

		$('#' + data.id).remove();
	};

	var moveBall = function(data){
		console.log(data);
		
		$('#' + data.id).css({
			'top': data.top,
			'left': data.left,
			//'width':data.width,
			//'height': data.height,
			'transform':'rotate('+data.rotate+'deg)',
			//'border-top': '100px solid' + data.color
			//'transform':'scale(' +data.width+','+data.height+')'
			
		});
	};

	/*var readColor = function(data){
		//console.log("readColor");
		var c = document.getElementById("myCanvas");
        //var color = document.getElementById('color');
        var ctx = c.getContext("2d");

        //ctx.fillStyle = "#FF0000";
        

        ctx.fillStyle = 'rgb(' + r + ',' +
                       g + ','+ b + ')';
        //ctx.fillStyle = 'rgb(' + Math.round(Math.random() * 255) + ',' +
                       //Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) +')';
        ctx.fillRect(g_left,g_top,75,75);

        //ctx.fillStyle = "#FF0000";
        //ctx.fillRect(0,0,150,75);

		 console.log("isWorking"+ g_top+" "+g_left);
		 function pick(event) {
         var x = event.layerX;
         var y = event.layerY;
         var data = ctx.getImageData(x, y, 1, 1).data;
		 //var data = ctx.getImageData(10, 10, 1, 1).data;
		 console.log('r: ' + data[0]+'g: ' + data[1]+'b: ' + data[2]);
		 
		}
		c.addEventListener('mousemove', pick);

		/*var c = document.getElementById("myCanvas");
    //var color = document.getElementById('color');

    var ctx = c.getContext("2d");

    function copy() {
    var imgData = ctx.getImageData(10, 10, 50, 50);
    var data = imgData.data;

   // var rgba = 'rgba(' + data[0] + ',' + data[1] = ',' + data[2]
                + ',' + data[3] + ')';
    //color.textContent = rgba;
    console.log("color :" + data);
    console.log("isWorking");
};
	};*/

	var ballExists = function(id){
		// Wait, does this ball exist?
		if($('#' + id).length == 0){
			return false
		}else{
			return true;
		}
	};

	var attachEvents = function(){
		$(document).keydown(function(e) {
			console.log(e.keyCode);
			socket.emit('move', e.keyCode);
		});
	};	

	var init = function(){
		console.log('Initializing app.');

		socketSetup(attachEvents);	// Sending attachEvents as a callback	
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);