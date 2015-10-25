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

////////////////////////////////
var fs = require('fs');
var vocList = {};

//======= Get Voc =========
var readData = fs.readFileSync('files/voc.txt');
readData = readData.toString();

getVoc();
function getVoc(){
	var returnString="";
	console.log(readData);
	if(readData!=null){
		var tempVocList = readData.split(";");
		//console.log(tempVocList);
		for(var i=0;i<tempVocList.length;i+=2){
			//console.log(i);
			if(tempVocList[i]!=""){
				vocList[tempVocList[i]]={def:tempVocList[i+1]};
			}
		}

				// for(var voc in vocList){
				// 	returnString += "<b>"+voc+"</b>: "+vocList[voc]+". <br>";
				// }
				// return returnString;
		console.log(vocList);
		getit();
	}
}
//======= Save Voc =========
function saveVoc(Voc,def){
	var saveData = Voc+";"+def+";";
	fs.appendFileSync('files/voc.txt',saveData);
	readData = fs.readFileSync('files/voc.txt');
	readData = readData.toString();
	getVoc();
}
// ROUTERS


// We won't use GET with AJAX requests though
// GET is more useful when you're requesting pages that
// are generated dinamically on the server
function getit(){
	app.get('/vocList', function(request, response){
		console.log('The client just sent a ' + request.method +
					' request for ' + request.url);
		var names = [];
		for(var name in vocList){

			console.log(name);
			names.push(name);
		}
		response.json(names);
	});
}



app.post('/addNew',function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	saveVoc(request.body['newVoc'],request.body['newDef']);
});

// POST requests
app.post('/def', function(request, response){
	console.log('The client just sent a ' + request.method +
				' request for ' + request.url);
	// Body parser puts everything inside a req.body object
	console.log(request.body['voc']);

	// Send back the data
	response.json({
		voc: request.body['voc'],
		def: vocList[request.body['voc']]
	});
});

///////////////////////////////////////



/*---------- BASIC SETUP ----------*/
var PORT = 8000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/


