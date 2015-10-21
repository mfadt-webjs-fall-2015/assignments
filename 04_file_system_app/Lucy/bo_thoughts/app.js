/* ---------- BASIC SETUP ---------- */
var express		= require('express'),
	bodyParser	= require('body-parser');	// helper for parsing HTTP requests
	fs          = require('fs');

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


/*-------------- APP --------------*/

var saveAsAFile = function(data){

	// add array of boThoughts to the JSON file :  write file with fs module
	// saved current array as file on computer

	fs.writeFile('files/bo_thoughts.txt', data, function(err) {
    	if (err) {
       		console.log('error');
    	} else {
        	console.log('Writing file Async: It is saved');
    	}
	});
	// no spaces after commas in array

	// replaces file every time, so will not add onto previously entered list
	// tried appendFile, worked but all mushed together, no space

	// var file = fs.createWriteStream(filename);
	// file.on('error', function(err) { 
	// 	console.log(err ? 'Error :'+ err : 'ok'  )
	// });
	// boThoughts.forEach(function(v) { 
	// 	file.write('\n'); 
	// });
	// file.end();
};

// POST requests
app.post('/save-thoughts', function(request, response){
	//Your fs.writeFile function here. If msg is an Array, you can loop through it
	saveAsAFile(request.body['data[]']);
	response.json({
		confirmation: sendSomeConfirmationBack
	});
});

/*---------------------------------*/


/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/