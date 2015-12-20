// /*---------- BASIC SETUP ----------*/

var express = require('express');
var bodyParser  = require('body-parser');
var app = express();

var server = app.listen(3000);

var io = require('socket.io').listen(server);

//set up Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

//set up Express server, for any call, will have callback (request), response, and next req
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));
/*---------------------------------*/

// /*-------------- APP --------------*/

io.on('connection', function(socket){
  console.log('a user connected');
    socket.on('secret message', function(msg){

        fs.appendFileSync('secrets/secret_message.txt', "\n" +" Latest secret: " + msg );
        console.log('secret message: ' + msg + ' is saved!');
      
    });
});

//TESTS
var fs = require('fs');

var readData = fs.readFileSync('secrets/input.txt');
readData = readData.toString(); // convert to string
console.log('Sync: ' + readData);

var myString = 'hey what\'s up!';

fs.writeFileSync('secrets/new_message.txt', myString);
console.log('Saved file (sync)');

app.get('/data', function(req, res){
  res.send(readData); 
});

app.get ('/', function(req, res){
    res.send(index.html); 

});

