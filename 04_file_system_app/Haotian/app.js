/*---------- BASIC SETUP ----------*/
var express		= require('express'),
	bodyParser	= require('body-parser');	// helper for parsing HTTP requests

var app = express();						// our Express app

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

// Express server
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


var fs = require('fs');

/*----- Read file -----*/


var dataset;

// fs.readFile --> Async
fs.readFile('file/aqi.txt', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        dataset = data.toString(); // convert to stringa
        // console.log('Async: ' + data); // Right!
    }
});

// Wrong!
// console.log(dataset);

// fs.readFileSync --> Sync
var readData = fs.readFileSync('file/aqi.txt');
readData = readData.toString(); // convert to string
console.log('Sync: ' + readData);



/*----- server -----*/

app.get('/text', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	var text = [];
	for(var text in readData){
		console.log(text);
		text.push(text);
	}
	response.json(text);
});

//POST requests
app.post('/text', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	// Body parser puts everything inside a req.body object
	console.log(request.body['text']);

	// Send back the data
	response.json({
		text: request.body['text']
	});
});

/*---------------------------------*/


/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/

