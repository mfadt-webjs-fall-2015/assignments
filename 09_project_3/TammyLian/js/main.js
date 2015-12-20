  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var win=$(window),doc=$(document),canvas=$('#myCanvas');
var winWidth=win.width(),winHeight=win.height();
var docWidth=doc.width()-winWidth,docHeight=doc.height()-winHeight;
var increment=0,x=0,y=0,mouseX=0,mouseY=0,damping=100;

requestAnimFrame(render);

doc.on('mousemove',function(e){
    mouseX=e.pageX*(canvas.width()-winWidth)/winWidth;
    mouseY=e.pageY*(canvas.height()-winHeight)/winHeight;
});

function render(){
    requestAnimFrame(render);
    //x+=(-mouseX-x+10)/damping;
    y+=(-mouseY-y+100)/damping;
    canvas.css({'-webkit-transform':'translate('+x+'px,'+y+'px)'});
}

// function showCoords(event) {
//     var x = event.clientX;
//     var y = event.clientY;
//     var coords = "X coords: " + x + ", Y coords: " + y;
//     document.getElementById("demo").innerHTML = coords;
// }