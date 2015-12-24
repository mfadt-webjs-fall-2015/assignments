var ctracker;
var inputW = 5;
var inputH = 5;
var imgFace;

function setup() {

  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.parent('container');

  videoInput.size(500, 375);
    videoInput.position(window.innerWidth/2-videoInput.width/2 , 
      window.innerHeight/2-videoInput.height/2);
  
  //hide video feed
  videoInput.show();
  
  // setup canvas
  var cnv = createCanvas(800, 600);
  cnv.parent('container');

  cnv.position(window.innerWidth/2-videoInput.width/2 , 
      window.innerHeight/2-videoInput.height/2);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  //setup img
  imgFace = loadImage("img/head2.gif");

  noStroke();
}

function draw() {
    clear();  
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  
  for (var i=0; i<positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 2, 2);
  }
    // var faceX = dist(positions[1][13];

  
  
  fill(255,0,0);
  
  //make sure that the array is there
  if(positions.length > 0)
  {
    var faceX = positions[1][0]; 
    var faceY = positions[20][1];
    var faceW = int(dist(positions[1][0],positions[20][1], positions[13][0],positions[20][1]));
    var faceH = int(dist(positions[1][0], positions[20][1],positions[1][0],positions[7][1]));
    image(imgFace, faceX, faceY-80, faceW, faceH+80);
  }
  
}