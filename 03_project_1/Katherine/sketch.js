// A sound file object
var song;



// A wind direction vector
var wind;
// Circle position
var position;


var input;
var analyzer;



var request;
var text = $('#text-box');


function preload() {

   createCanvas(1280, 720);
  // Load a sound file
  song = loadSound('sounds/katy.mp3');
}



if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else {
  request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', 'ebola-outbreak-data.json');
request.onreadystatechange = function() {
  if ((request.readyState===4) && (request.status===200)) {
    var items = JSON.parse(request.responseText);
    console.log(items);
    console.log(items.length);
    for (var i = 0; i < items.length; i++){
    console.log(items[i].cases);
    $(text).append(items[i].cases);
    }
  }


}
request.send();











function setup() {
  // createCanvas(710, 400);

  // Loop the sound forever
  // (well, at least until stop() is called)
  song.loop();

  //
  // sound.amp(0);
  //

//
 // mic = new p5.AudioIn();

 // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  // mic.start();

  //



 
  // Request the data from openweathermap
  loadJSON('http://api.openweathermap.org/data/2.5/weather?zip=10009,us', gotWeather);

   loadJSON('http://api.openweathermap.org/data/2.5/weather?zip=10009,us', gotWeather2);
  // Circle starts in the middle
  position = createVector(width/2, height/2);
  // wind starts as (0,0)
  wind = createVector();

  // Circle starts in the middle
  position2 = createVector(width/2, height/2);




}

function draw() {
  // background(200);

  // Set the volume to a range between 0 and 1.0
  var volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.01, 4);
  song.rate(speed);

  // Draw some circles to show what is going on
  // stroke(0);
  // fill(51, 100);
  // ellipse(mouseX, 100, 48, 48);
  // stroke(0);
  // fill(51, 100);
  // ellipse(100, mouseY, 48, 48);

   push();


  var h = map(volume, 0, 1, height, 0);
  stroke(255, 119, 216, 90);
  fill(255, 76, 148, 90);
  ellipse(width/2, h - 25, 50, 50);
  ellipse(width/2, h - 5, 50, 50);


   var g = map(speed, 0, 1, width, 0);
  ellipse(width/2, g - 10, 100, 100);
    ellipse(width/2, g - 5, 80, 80);






    position.add(wind);

   position2.add(wind);


//

 // var spectrum = fft.analyze(); 
 //  noStroke();
 //  fill(0,255,0); // spectrum is green
 //  for (var i = 0; i< spectrum.length; i++){
 //    var x = map(i, 0, spectrum.length, 0, width);
 //    var h = -height + map(spectrum[i], 0, 255, height, 0);
 //    rect(x, height, width / spectrum.length, h )
 //  }

 //  var waveform = fft.waveform();
 //  noFill();
 //  beginShape();
 //  stroke(255,0,0); // waveform is red
 //  strokeWeight(1);
 //  for (var i = 0; i< waveform.length; i++){
 //    var x = map(i, 0, waveform.length, 0, width);
 //    var y = map( waveform[i], -1, 1, 0, height);
 //    vertex(x,y);
 //  }
 //  endShape();


//



  stroke(255, 119, 216, 30);
  fill(255, 76, 148, 90);
  // tint(255, 153, 204, 60); 
  rect(position.x, position.y, 1800, 20);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;


  stroke(128, 38, 74, 100);
  fill(255, 0, 102, 60);
  // tint(255, 153, 204, 60); 
  rect(position.x, position.y, 1800, 30);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;



  stroke(204, 0, 82, 10);
  fill(204, 0, 82, 10);
  // tint(255, 153, 204, 60); 
  rect(position.x, position.y, 1300, 10);

  if (position2.x > width)  position2.x = 0;
  if (position2.x < 0)      position2.x = width;
  if (position2.y > height) position2.y = 0;
  if (position2.y < 0)      position2.y = height;



  stroke(128, 38, 74, 10);
  fill(128, 38, 74, 10);
  // tint(255, 153, 204, 60); 
  rect(position.x, position.y, 1300, 40);

  if (position2.x > width)  position2.x = 0;
  if (position2.x < 0)      position2.x = width;
  if (position2.y > height) position2.y = 0;
  if (position2.y < 0)      position2.y = height;

  stroke(128, 38, 74, 100);
  fill(127, 0, 51, 10);
  // tint(255, 153, 204, 60); 
  rect(position.x, position.y, 1800, 50);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;




}


function gotWeather(weather) {
  
  // Get the angle (convert to radians)
  var angle = radians(Number(weather.wind.deg));
  // Get the wind speed
  var windmag = Number(weather.wind.speed);
  
  // Display as HTML elements
  // var temperatureDiv = createDiv(floor(weather.main.temp) + '&deg;');
  // var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");
  
  // Make a vector
  wind = p5.Vector.fromAngle(angle);




   // Get the overall volume (between 0 and 1.0)
  // var vol = mic.getLevel();
  // fill(127);
  // stroke(0);

  // Draw an ellipse with height based on volume
  // var h = map(vol, 0, 1, height, 0);
  // ellipse(width/2, h - 25, 50, 50);
}


function gotWeather2(weather){
  var angle = radians(Number(weather.wind.deg));
  var windmag = Number(weather.wind.speed);

  wind = p5.Vector.fromAngle(angle);
}











