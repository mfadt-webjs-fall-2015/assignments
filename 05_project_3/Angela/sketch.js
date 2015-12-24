var osc, osc2;
var playing = false;
var mp, mr;
var mousePressing = false;
var clouds = {};
var lastCloudId = 0;
var currentCloud;

var DIRECTION_UP = -1;
var DIRECTION_DOWN = 1;

var pitches = [/*131, 147,*/ 175, 196, 220,   // C3 D3 F3 G3 A3
               262, 294, 349, 392, 440,       // C4 D4 F4 G4 A4
               523, 587, 698, 784, 880,       // C5 D5 F5 G5 A5
               1046, 1174, 1396];             // C6 D6 F6

var soundPaths = ['sounds/F3.mp3', 'sounds/G3.mp3', 'sounds/A3.mp3',
                  'sounds/C4.mp3', 'sounds/D4.mp3', 'sounds/F4.mp3', 'sounds/G4.mp3', 'sounds/A4.mp3',
                  'sounds/C5.mp3', 'sounds/D5.mp3', 'sounds/F5.mp3', 'sounds/G5.mp3', 'sounds/A5.mp3',
                  'sounds/C6.mp3', 'sounds/D6.mp3', 'sounds/F6.mp3'];

var imgPaths = ['img/cloud_green4.png', 'img/cloud_purple3.png', 'img/cloud_cyan3.png',
                'img/cloud_yellow3.png', 'img/cloud_magenta3.png', 'img/cloud_green3.png', 'img/cloud_purple2.png', 'img/cloud_cyan2.png',
                'img/cloud_yellow2.png', 'img/cloud_magenta2.png', 'img/cloud_green2.png', 'img/cloud_purple1.png', 'img/cloud_cyan1.png',
                'img/cloud_yellow1.png', 'img/cloud_magenta1.png', 'img/cloud_green1.png'];

var HARMONY_Y_DIFF = 20; // px

function checkHarmony() {
  // sort clouds by y and see if their y is close.
  var cloudsToStart = {}; // any cloud not here shall be stopped!
  var cloudsIdAndY = [];
  for(var cloudId in clouds){
    cloudsIdAndY.push({
      id: cloudId,
      cy: clouds[cloudId].cy,
      beginFadeOutFrame: clouds[cloudId].beginFadeOutFrame
    });
  }

  cloudsIdAndY.sort(function(c1, c2){
    return c1.cy - c2.cy;
  });

  var currentTestBaseCloudY;
  var currentTBCloudShouldPlay;
  var currentTBCloudShouldPlayUntil;


  for(var i = 0; i < cloudsIdAndY.length; i++){
    currentTestBaseCloudY = cloudsIdAndY[i].cy;
    currentTBCloudShouldPlay = false;
    currentTBCloudShouldPlayUntil = undefined;

    for(var j = i + 1; j < cloudsIdAndY.length; j++){
      if(!cloudsIdAndY[j].beginFadeOutFrame && cloudsIdAndY[j].cy <= currentTestBaseCloudY + HARMONY_Y_DIFF){
        currentTBCloudShouldPlay = true;
        currentTBCloudShouldPlayUntil = j;
      }else{
        break;
      }
    }
    if(currentTBCloudShouldPlay){
      for(var k = i; k <= currentTBCloudShouldPlayUntil; k++){
        cloudsToStart[cloudsIdAndY[k].id] = {};
      }
    }
  }

  for(var i in cloudsToStart){
    if(clouds[i]){
      clouds[i].OSCStart();
    }
  }

  for(var i in clouds){
    if(i in cloudsToStart){
      continue;
    }
    if(!clouds[i]) continue;
    // don't stop still-generating clouds!
    if(clouds[i].generating){
      continue;
    }
    clouds[i].OSCStop();
  }

}

var Cloud = function() {
  this.cSize;

  this.cx = mouseX;
  this.cy = mouseY;

  this.cColorH = frameCount%16;
  this.cColorS = 90;
  this.cColorL = 97;
  this.alpha = 0.8;

  this.imgPath = imgPaths[this.cColorH%imgPaths.length];
  this.imgFile = loadImage(this.imgPath, function() {
    // console.log("Image loaded!");
  }.bind(this));

  this.direction = 0;
  this.velocity = 0;
  this.acceleration = 0;

  // this.osc = new p5.Oscillator();
  // this.osc.setType('sine');

  // this.frequency = pitches[this.cColorH%pitches.length];
  // this.osc.freq(this.frequency);
  this.soundPath = soundPaths[this.cColorH%soundPaths.length];
  this.soundFile = loadSound(this.soundPath, function() {
    // console.log("Sound loaded!");
    if(this.generating){
      this.soundFile.play();
    }
  }.bind(this));

  this.amplitude = 0.2;
  // this.osc.amp(this.amplitude, 0);

  this.sounding = false;

  this.OSCStop = function() {
    /*if(this.started){

      // this.osc.stop();
      if(this.soundFile.isPlaying()) {
        this.soundFile.stop();
        this.started = false;
      }
    }*/

    this.sounding = false;
  }.bind(this);

  this.OSCStart = function() {
    //if(!this.started){
      //console.log(this.soundFile.isLoaded());
      // this.osc.start();

      if(this.soundFile.isLoaded()/* && !this.soundFile.isPlaying()*/) {
//        console.log(this.soundFile);
  //      console.log("CT", this.soundFile.currentTime());
        if(this.soundFile.currentTime() > 1 || this.soundFile.currentTime() === 0){
          this.soundFile.play();
        }
      }
      this.sounding = true;
//    }
  }.bind(this);

  this.drawCloud = function() {

    if(this.generating) {
      this.cSize = frameCount - this.mp;

      this.amplitude += 0.05;
      this.amplitude = Math.min(1, this.amplitude);
      if(this.cColorL >= 120) {
        this.cColorL = 120;
      }
      else {
        // this.cColorL += 1;
        this.cColorS += 0.1;
      }
      // console.log(this.cColorL);
    }
    else {
      this.cSize = this.mr - this.mp;
    }

    if(this.velocity > 0){
      this.recalculatePosition();
    }

    this.cSize *= 12;
    // this.osc.amp(this.amplitude, 0);
    this.soundFile.setVolume(this.amplitude);
    //console.log(this.cSize);

    if(this.beginFadeOutFrame){
      // this.alpha -= (frameCount - this.beginFadeOutFrame) / 300.0;
      this.alpha -= 0.003;
      //console.log(this.amplitude);
      if(this.amplitude > 0) {
        this.amplitude -= 0.002;
      }
      else {
        this.amplitude = 0;
        // this.osc.stop();
        this.OSCStop();
      }

      if(this.alpha <= 0.003){
        // dead cloud!

        // this.osc.stop();
        this.OSCStop();
        delete clouds[this.id];
        return;
      }
    }

    noStroke();
    // fill('rgba(' + this.cColor + ',' + this.cColor + ',' + this.cColor + ',' + this.alpha + ')');

    // fill(this.cColorH, this.cColorS, this.cColorL, this.alpha);
    // ellipseMode(CENTER);
    //console.log(this.cx, this.cy, this.cSize, this.cSize);
    // ellipse(this.cx, this.cy, this.cSize, this.cSize);
    // tint(this.cColorH, this.cColorS, this.cColorL, this.alpha);


    this.realAlpha = this.alpha;
    if(this.sounding && !this.generating) {
      this.realAlpha *= 0.7;
    }

    tint(this.cColorH, 0, this.cColorL, this.realAlpha);
    image(this.imgFile, this.cx, this.cy, this.cSize, this.cSize);
  }.bind(this);

  this.beginFly = function(){
    this.direction = DIRECTION_UP;
    this.velocity = 5; // px per frame
    this.acceleration = -0.003 + Math.random() * -0.008; // px per frame^2
    // this.osc.stop();
  }.bind(this);

  this.recalculatePosition = function(){
    this.cy += this.direction * this.velocity;
    this.velocity += this.acceleration;

    if(this.velocity <= 0){
      this.stopAndFadeOut();
    }

    if(this.cy - this.cSize <= 0){
      this.direction *= -1;
    }else if(this.cy + this.cSize >= windowHeight){
      this.direction *= -1;
    }
  }.bind(this);

  this.stopAndFadeOut = function(){
    this.velocity = 0;
    this.acceleration = 0;

    this.beginFadeOutFrame = frameCount;
  }.bind(this);

}

function setup() {
  // backgroundColor = color(255,0,255);
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  colorMode(HSB, 360, 100, 100, 1);
  imageMode(CENTER);
  ellipseMode(CENTER);
  soundFormats('mp3');

  mpX = 0;
  mpY = 0;
}

function draw() {
  background(255);
  for(var cloudId in clouds){
    clouds[cloudId].drawCloud();
  }
  checkHarmony();
}

function mousePressed() {
  console.log("pressed");
  var c = new Cloud();
  c.id = lastCloudId;
  clouds[lastCloudId] = c;
  lastCloudId++;
  if(lastCloudId==1){
    $('#first-step').fadeOut(2000, function(){
      $(this).remove();
    });
    $('#second-step').fadeIn(2000);
  }
  if(lastCloudId==3){
    $('#second-step,#title').fadeOut(2000, function(){
      $(this).remove();
    });
  }
  currentCloud = c;
  c.generating = true;
  c.OSCStart();
  c.mp = frameCount;
}

function mouseReleased() {
  console.log("released");
  currentCloud.generating = false;
  currentCloud.mr = frameCount;
  if(currentCloud.mr == currentCloud.mp){
    currentCloud.mr++;
  }
  currentCloud.beginFly();
  currentCloud.OSCStop();
  currentCloud = undefined;
}