/*---------- BASIC SETUP ----------*/
var express	= require('express');
var app = express();						// our Express app
var PORT = 4000;

app.use('/', express.static(__dirname + '/public'));
app.use('*', function(req, res) {
  // console.log(req.headers['user-agent']);
  // Say if req.headers['user-agent'] contains "Mobile", re-route the user to mobile interface
  var ua = req.headers['user-agent'];
  if (ua.indexOf('Mobile') > -1) {
    console.log('User is using mobile device');
    res.redirect('mobile.html');
  } else {
    // Else display a desktop version
    console.log('User is using desktop device');
    res.redirect('desktop.html');
  }
});

// -----> Socket.io setup
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Express server is running at ' + PORT);
});

var users = []; // array of the users

/*-------------- APP --------------*/
io.on('connection', function(socket) {
    /*––––––––––– SOCKET.IO starts here –––––––––––––––*/

    console.log('A new user has connected: ' + socket.id);

    console.log(socket.id + ' just connected');
    addUser(socket.id);
    console.log("users array: " + users);

    socket.emit('start', { //start event is something we define
    //pass in an object:
    	user: socket.id, //user property
    	date: new Date(), //date property (todays date)
 	  });

  	

    socket.on('coordinates', function(data) { //when we get data from the socket
      // Coordinates from one user
      //console.log(socket.id + ' has sent: ' + data);
      // console.log('has sent: ', socket.id, data);
      // Emit coordinates to every clients (all players)
      io.sockets.emit('coordinates-from-user', {
        //attaching
        id: socket.id,
        x: data.x,
        y: data.y,
        z: data.z,
      });
    });

    socket.emit('get-users', { //start event is something we define
    //pass in an object:
      users: users
    });


    // Disconnecting
    socket.on('disconnect', function() {
        io.sockets.emit('bye', 'See you, ' + socket.id + '!');
        removeUser(socket.id);
    });

});

function addUser(user) {
  if (users.indexOf(user) === -1) {
    users.push(user);
  }
  console.log('current users: ' + users.length);
}

function removeUser(user) {
  users.splice(user, 1);
  console.log('current users: ' + users.length);
}