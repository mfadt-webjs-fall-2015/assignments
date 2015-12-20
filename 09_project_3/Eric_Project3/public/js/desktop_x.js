
var users = []
var socket = io.connect(); //socket to listen to app
var usertimer = setInterval(getUsers, 1000);

function getUsers(){
    socket.on('get-users', function(data){
      usersLocal = data.users;
      console.log('users length: ', usersLocal.length);
    });
}

//--------------p5 SKETCH -------

var sketch = function(p) {
  var soundX, soundY;
  var socket = io.connect(); //socket to listen to app
  var canvas;
  var usersLocal = [];
  var usersData = [];
  var circles = [];


  p.setup = function(){


    // socket.on('get-users', function(data){
    //   // for(var i = 0; i < data.users.length; i++){
    //   //   usersData.push({
    //   //     id: data.users[i],
    //   //     x: null,
    //   //     y: null,
    //   //     z: null
    //   //   });
    //   // }
    //   usersLocal = data.users;
    //   console.log('users length: ', usersLocal.length);

    //});
  }


  p.draw = function(){
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.stroke(0);
    p.push();
    p.translate(p.windowWidth/2, p.windowHeight/2);
    socket.on('coordinates-from-user', function(data) {
      // for (var i = 0; i < usersLocal.length; i++) {
      //   if(data.id == usersLocal [i]){
      //     var tempCircle  = new Circle();
      //     tempCircle.update(data.x, data.y);
      //     tempCircle.drawCircle();

      //     //---------p5 sound ----------
      //     // var osc = new p5.Oscillator();
      //     // osc.setType('sine');
      //     // osc.freq(p.map(Math.abs(data.x), 0 , 50, 240, 440 ));
      //     // osc.amp(0.5);
      //     // osc.start();
      //     console.log('i: '+ i+ 'x: ' + data.x + 'y: ' + data.y);
      //   }
      // };
    });

    p.pop();


    // for(var i = 0; i < usersData.length; i++){
    //   if (usersData[i].x != null) {
    //     p.push();
    //     p.translate(p.windowWidth/2, p.windowHeight/2);
    //     p.noStroke();
    //     p.fill(p.map(Math.abs(soundX), 0, 90, 255, 0));
    //     tempCircle.drawCircle();
    //     p.pop();
    //     console.log('usersData '+i+'x : ', usersData[i].x );
    //     console.log('usersData ' +i+ 'y : ', usersData[i].y );
    //   };
    // }

    // for(var i = 0; i < circles.length; i++ ){

    //     circles[i].update(usersData[i].x, usersData[i].y);
    //     circles[i].drawCircle;
    // }
  }



 //-------------------------------circle class------------------------------
  var Circle = function(){
    this.resolution = 260; // how many points in the circle
    this.rad = 150;
    this.x = 1;
    this.y = 1;
    this.changeX = 30;
    this.changeY = 30;

    this.t = 0; // time passed
    this.tChange = .02; // how quick time flies
     
    this.nVal; // noise value
    this.nInt = 1; // noise intensity
    this.nAmp = 1; // noise amplitude

    Circle.prototype.update = function(xVal, yVal){
      this.changeX = xVal;
      this.changeY = yVal;
    }

    Circle.prototype.drawCircle = function(){
      p.noiseDetail(3);
      this.nInt = p.map(Math.abs(this.changeX), 0, 90, 1, 2); // map mouseX to noise intensity
      this.nAmp = p.map(Math.abs(this.changeX), 0, 90, 0.7, 1.6); // map mouseY to noise amplitude
      p.beginShape();
      for (var a=0; a<=p.TWO_PI; a+=p.TWO_PI/this.resolution) {
     
        this.nVal = p.map(p.noise( Math.cos(a)*this.nInt+1, Math.sin(a)*this.nInt+1, this.t ), 0.0, 1.0, this.nAmp, 1.0); // map noise value to match the amplitude
     
        this.x = Math.cos(a)*this.rad *this.nVal;
        this.y = Math.sin(a)*this.rad *this.nVal;
        p.vertex(this.x, this.y);
         
      }
      p.endShape(p.CLOSE);
      this.t += this.tChange;
    }
  } 

}
var myp5 = new p5(sketch);

