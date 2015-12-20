// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

// var WIDTH = window.innerWidth;
// var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

// set options for the oscillator

// oscillator.type = 'square';
// oscillator.type = 'sawtooth';
oscillator.type = 'triangle';
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.detune.value = 100; // value in cents
oscillator.start(0);

oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}

gainNode.gain.value = initialVol;

// Mouse pointer coordinates


//-----------------------------------------------------------------------//
//array of users from socket
var users = []; 
// Socket.io connection
var socket = io.connect(); //socket to listen to app
// socket.on('coordinates-from-user', function(data) {
//   // console.log(data);

//   soundX = data.x;
//   soundY = data.y ;
//   // console.log('soundX: ', soundX);
//   // console.log('soundY', soundY);
//   updateSound();
// });

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function updateSound() {
    KeyFlag = false;
    var changing = Math.abs(soundX);
    // console.log("sound x: ", soundX);

    changing = map_range(changing, 0, 90, 100, 300);
    // if(changing >= 1500){
    //   changing = 1500;
    // }
    oscillator.frequency.value = changing;
    // console.log("change: ", changing);
    gainNode.gain.value = maxVol;
}
var soundX, soundY;

var sketch = function( p ) {

  // var socket = io.connect(); //socket to listen to app
  var canvas;
  //-----------------Circle test---------
  var resolution = 260; // how many points in the circle
  var rad = 150;
  var x = 1;
  var y = 1;
  //float prevX;
  //float prevY;
   
  var t = 0; // time passed
  var tChange = .02; // how quick time flies
   
  var nVal; // noise value
  var nInt = 1; // noise intensity
  var nAmp = 1; // noise amplitude
  // var osc = new p5.Oscillator();
     //-------------------------------------

  //----------------------P5 Sketch--------------------------------------------

  p.setup = function() {
    p.noiseDetail(4);
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    // canvas.position(p.width/2, p.height/2);
    socket.on('start', function(data) {
      users = data.users;
    });
    socket.on('coordinates-from-user', function(data) {
      // console.log(data);

      soundX = data.x;
      soundY = data.y;
      console.log('soundX: ', soundX);
      // console.log('soundY', soundY);
      updateSound();
      // osc.setType('sine');
      // osc.freq(p.map(Math.abs(soundX), 0 , 90, 240, 440 ));
      // osc.amp(0.5);
      // osc.start();
    });


    // var radiusVal = soundX
    // console.log('radiusVal: ', radiusVal);

  };

  p.draw = function() {
    // p.background(p.map(Math.abs(soundX), 0, 90, 200, 100), p.map(Math.abs(soundX), 0, 0, 0, 100), p.map(Math.abs(soundX), 0, 90, 100, 200));
    p.background(255);
    p.push();
    p.translate(p.windowWidth/2, p.windowHeight/2);

    p.noStroke();
    p.fill(p.map(Math.abs(soundX), 0, 90, 0, 255), p.map(Math.abs(soundX), 0, 0, 0, 100), p.map(Math.abs(soundX), 0, 90, 255, 100));

    // p.stroke(p.map(Math.abs(soundX), 0, 90, 200, 100), p.map(Math.abs(soundX), 0, 0, 0, 100), p.map(Math.abs(soundX), 0, 90, 100, 200));
    // p.strokeWeight(1);
    // p.fill(255);


    // p.ellipse(p.width/2, p.height/2, Math.abs(soundX)*5, Math.abs(soundX)*5);
    // // p.fill(p.map(Math.abs(soundX), 0, 90, 0, 209));
    // p.noFill();
    // p.stroke(p.map(Math.abs(soundX), 0, 90, 255, 0));

    //----------------noise circle test----------------
    nInt = p.map(Math.abs(soundX), 0, 90, 1, 2); // map mouseX to noise intensity
    nAmp = p.map(Math.abs(soundX), 0, 90, 0.7, 1.6); // map mouseY to noise amplitude
    p.beginShape();
    for (var a=0; a<=p.TWO_PI; a+=p.TWO_PI/resolution) {
   
      nVal = p.map(p.noise( Math.cos(a)*nInt+1, Math.sin(a)*nInt+1, t ), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude
   
      x = Math.cos(a)*rad *nVal;
      y = Math.sin(a)*rad *nVal;
      p.vertex(x, y);
       
    }
    p.endShape(p.CLOSE);
    p.pop();
 
    t += tChange;

  };
};

var myp5 = new p5(sketch);



    

