


startOsc = function() {

    var context = new window.webkitAudioContext(),
        osc = context.createOscillator(),
        // lfo = context.createOscillator(),
        gain = context.createGain(),
        osc2 = context.createOscillator(),
        
         w = window.innerWidth,
        h = window.innerHeight;
    

    osc.type = 'sine';
    osc2.type = "triangle";


    osc.connect(context.destination);
    gain.connect(osc.frequency);

  osc2.connect(gain);
    // lfo.connect(gain.gain);
    // osc.connect(gain);
    // gain.connect(context.destination);




    osc.start(0);
    osc2.start(0);
    // lfo.start(0);

    // document.addEventListener("mousemove", function(e) {
    //     osc.frequency.value = e.clientY / h * 1000 + 300;
    // });

    if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function( event ) {
  // //alpha: rotation around z-axis
  // var rotateDegrees = event.alpha;
  // //gamma: left to right
  // var leftToRight = event.gamma;
  // //beta: front back motion
  // var frontToBack = event.beta;

    // osc.frequency.value = event.alpha;
    // gain.gain.value = event.beta;
    // osc2.frequency.value = event.gamma;


      osc.frequency.value = event.alpha / h * 3000 + 90;
        osc2.frequency.value = event.beta / w * 3000 + 200;
        gain.gain.value = event.gamma / w * 8000 + 90;
    // lfo.frequency.value = event.beta;
   

  // handleOrientationEvent( frontToBack, leftToRight, rotateDegrees );
    });
}



// var handleOrientationEvent = function( frontToBack, leftToRight, rotateDegrees ){
//  // var handleOrientationEvent = function(e){   
// osc.frequency.value = maxFreq * rotateDegrees;
// // gain.gain.value = leftToRight * maxVol;

// };

// }
window.addEventListener('deviceorientation', function(event) {
  console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});

};



// Initialize Variables
var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
var button = document.getElementById("button");
// Close Popup Event
closePopup.onclick = function() {
  overlay.style.display = 'none';
  popup.style.display = 'none';
};
// Show Overlay and Popup
button.onclick = function() {
  overlay.style.display = 'block';
  popup.style.display = 'block';
}