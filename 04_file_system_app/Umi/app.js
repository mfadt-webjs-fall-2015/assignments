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
/*-------------- FILESYSTEM --------------*/
var fs = require('fs');
var food_db = {};
var dataset;

fs.readFile('foo.txt', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        dataset = data.toString(); // convert to string
        console.log(dataset);
        var temp = dataset.split(",");
        for (var i=0; i<temp.length; i+=2) {
        	if(temp != null) {
        		food_db[temp[i]] = {foodname: temp[i+1]};
        	}
        }
        console.log(food_db);
    }
});


// ROUTERS

// We won't use GET with AJAX requests though
// GET is more useful when you're requesting pages that
// are generated dinamically on the server
app.get('/food_db', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	var names = [];
	for(var name in food_db){
		console.log(name);
		names.push(name);
	}
	response.json(names);
});

// POST requests
app.post('/foodname', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	// Body parser puts everything inside a req.body object
	console.log(request.body['food']);

	// Send back the data
	response.json({
		food: request.body['food'],
		foodname: food_db[request.body['food']]
	});
});



/*---------------------------------*/

/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/




